from flask import Flask, request, jsonify
from flask_cors import CORS
import math
import pandas as pd
from models.linear_regression import LinearRegression
import os
import numpy as np
from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import LabelEncoder
from collections import defaultdict
import logging

app = Flask(__name__)
CORS(app)

model = LinearRegression()

def calculate_statistics(data, class_column):
    statistics = {}
    for label in data[class_column].unique():
        label_key = int(label) if isinstance(label, np.integer) else label
        class_data = data[data[class_column] == label]
        stats = {}
        for column in data.columns:
            if column != class_column:
                stats[column] = {
                    'mean': float(class_data[column].mean()),
                    'sd': float(class_data[column].std())
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

        df = pd.DataFrame(data)
        df = df.apply(pd.to_numeric, errors='ignore')

        le = LabelEncoder()
        df[class_column] = le.fit_transform(df[class_column])

        feature_columns = [col for col in df.columns if col != class_column]
        X = df[feature_columns]
        y = df[class_column]

        try:
            input_data = {k: float(v) for k, v in input_data.items()}
        except ValueError as e:
            return jsonify({'error': f'Invalid numeric value in input data: {str(e)}'})

        if len(input_data) < 2:
            return jsonify({'error': 'Expected at least 2 features, but got fewer'}), 400

        model = GaussianNB()
        model.fit(X, y)

        input_array = np.array([list(input_data.values())]).reshape(1, -1)
        prediction = model.predict(input_array)
        predicted_class = str(le.inverse_transform(prediction)[0])

        statistics = calculate_statistics(df[feature_columns + [class_column]], class_column)

        return jsonify({
            'prediction': predicted_class,
            'statistics': statistics
        })

    except Exception as e:
        return jsonify({'error': str(e)})

logging.basicConfig(level=logging.DEBUG)

class NaiveBayesClassifier:
    def __init__(self):
        self.word_counts = defaultdict(lambda: defaultdict(int))
        self.class_counts = defaultdict(int)
        self.total_words = defaultdict(int)
        self.vocabulary = set()

    def train(self, data):
        for sentence, category in data:
            self.class_counts[category] += 1
            for word in sentence.split():
                self.word_counts[category][word] += 1
                self.total_words[category] += 1
                self.vocabulary.add(word)

    def classify(self, sentence):
        results = {}
        total_classes = sum(self.class_counts.values())
        vocab_size = len(self.vocabulary)
        
        for category in self.class_counts:
            prior = math.log(self.class_counts[category] / total_classes)
            likelihood = 0
            for word in sentence.split():
                likelihood += math.log(
                    (self.word_counts[category].get(word, 0) + 1) /
                    (self.total_words[category] + vocab_size)
                )
            results[category] = prior + likelihood
        
        return results

    def get_class_counts(self):
        return dict(self.class_counts)

    def get_total_words(self, category):
        return self.total_words.get(category, 0)

    def get_vocabulary_size(self):
        return len(self.vocabulary)

classifier = NaiveBayesClassifier()

@app.route('/train', methods=['POST'])
def train():
    data = request.json.get('data')
    logging.debug("Training data received: %s", data)
    try:
        classifier.train(data)
        logging.info("Training completed successfully.")
        return jsonify({"message": "Training completed!"})
    except Exception as e:
        logging.error("Failed to train the model: %s", e)
        return jsonify({"error": f"Failed to train the model: {str(e)}"}), 500
    
@app.route('/classify_text', methods=['POST'])
def classify_sentence():
    text = request.json.get('text')  # Changed from 'sentence' to 'text'
    logging.debug("Text to classify: %s", text)
    try:
        results = classifier.classify(text)
        sorted_results = sorted(results.items(), key=lambda x: x[1], reverse=True)
        logging.info("Classification completed successfully.")
        return jsonify({"classification": sorted_results[0][0], "details": results})
    except Exception as e:
        logging.error("Failed to classify the text: %s", e)
        return jsonify({"error": f"Failed to classify the text: {str(e)}"}), 500


@app.route('/statistics', methods=['GET'])
def statistics():
    try:
        positive_count = classifier.get_class_counts().get('Positive', 0)
        negative_count = classifier.get_class_counts().get('Negative', 0)
        total_vocab_size = classifier.get_vocabulary_size()
        
        stats = {
            'positive_count': positive_count,
            'negative_count': negative_count,
            'total_vocab_size': total_vocab_size,
            'positive_words': classifier.get_total_words('Positive'),
            'negative_words': classifier.get_total_words('Negative')
        }
        
        return jsonify(stats)
    except Exception as e:
        logging.error("Failed to retrieve statistics: %s", e)
        return jsonify({"error": f"Failed to retrieve statistics: {str(e)}"}), 500

@app.route('/api/regression', methods=['POST'])
def regression():
    data = request.json
    x = data.get('x', [])
    y = data.get('y', [])
    predict_value = data.get('predictValue', None)
    predict_type = data.get('predictType', 'Y')

    if len(x) != len(y):
        return jsonify({'error': 'X and Y must have the same length'}), 400
    if len(x) < 2:
        return jsonify({'error': 'Provide at least 2 pairs of values'}), 400

    try:
        x = list(map(float, x))
        y = list(map(float, y))
        slope, intercept = model.calculate_regression(x, y)

        response = {
            'slope': slope,
            'intercept': intercept,
        }

        if predict_value is not None:
            predict_value = float(predict_value)
            if predict_type == 'Y':
                prediction = model.predict_y(predict_value)
            elif predict_type == 'X':
                prediction = model.predict_x(predict_value)
            else:
                return jsonify({'error': 'Invalid predict type'}), 400

            response['prediction'] = {
                'input': predict_value,
                'output': prediction,
                'type': predict_type,
            }

        return jsonify(response)

    except ValueError:
        return jsonify({'error': 'Invalid input values'}), 400

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=8000)
