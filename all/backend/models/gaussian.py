import os
import pandas as pd
import numpy as np
from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import LabelEncoder
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Helper function to calculate the mean and standard deviation for each feature
def calculate_statistics(data, class_column):
    statistics = {}
    for label in data[class_column].unique():
        # Convert int64 to native Python int
        label_key = int(label) if isinstance(label, np.integer) else label
        class_data = data[data[class_column] == label]
        stats = {}
        for column in data.columns:
            if column != class_column:
                stats[column] = {
                    'mean': float(class_data[column].mean()),  # Convert to native Python float
                    'sd': float(class_data[column].std())      # Convert to native Python float
                }
        statistics[label_key] = stats
    return statistics

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file and file.filename.endswith('.csv'):
        df = pd.read_csv(file)
        return jsonify({'data': df.to_dict(orient='list')})
    return jsonify({'error': 'Invalid file format. Please upload a CSV.'})

@app.route('/classify', methods=['POST'])
def classify():
    try:
        data = request.json['data']
        class_column = request.json['class_column']
        input_data = request.json['input_data']

        # Convert the input data to a pandas DataFrame and convert numeric columns to float
        df = pd.DataFrame(data)
        df = df.apply(pd.to_numeric, errors='ignore')

        # Encode the class labels as integers
        le = LabelEncoder()
        df[class_column] = le.fit_transform(df[class_column])

        # Use only the first two features for training
        feature_columns = [col for col in df.columns if col != class_column][:2]
        X = df[feature_columns]
        y = df[class_column]

        # Validate and convert input data
        try:
            # Use only the first two features from input data
            input_data = {k: float(v) for k, v in list(input_data.items())[:2]}
        except ValueError as e:
            return jsonify({'error': f'Invalid numeric value in input data: {str(e)}}}'})

        # Check if the input data has the correct number of features
        if len(input_data) != len(feature_columns):
            return jsonify({'error': f'Expected {len(feature_columns)} features, but got {len(input_data)} features'})

        # Fit Gaussian Naive Bayes model
        model = GaussianNB()
        model.fit(X, y)

        # Predict the class for the input data
        input_array = np.array([list(input_data.values())]).reshape(1, -1)
        prediction = model.predict(input_array)
        predicted_class = str(le.inverse_transform(prediction)[0])

        # Calculate statistics for the selected features only
        statistics = calculate_statistics(df[feature_columns + [class_column]], class_column)

        return jsonify({
            'prediction': predicted_class,
            'statistics': statistics
        })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
