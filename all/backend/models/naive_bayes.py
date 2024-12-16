from flask import Flask, request, jsonify
from collections import defaultdict
import math
import logging
from flask_cors import CORS  # Import CORS

# Create Flask app instance
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)  # This allows all domains to access the routes

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# NaiveBayesClassifier class definition
class NaiveBayesClassifier:
    def __init__(self):
        self.word_counts = defaultdict(lambda: defaultdict(int))
        self.class_counts = defaultdict(int)
        self.total_words = defaultdict(int)
        self.vocabulary = set()

    def train(self, data):
        # Training process: data is a list of tuples (sentence, category)
        for sentence, category in data:
            self.class_counts[category] += 1
            for word in sentence.split():
                self.word_counts[category][word] += 1
                self.total_words[category] += 1
                self.vocabulary.add(word)

    def classify(self, sentence):
        # Classification process: return log-probabilities for each class
        results = {}
        total_classes = sum(self.class_counts.values())
        vocab_size = len(self.vocabulary)
        
        for category in self.class_counts:
            prior = math.log(self.class_counts[category] / total_classes)
            likelihood = 0
            for word in sentence.split():
                # Using Laplace smoothing (additive smoothing)
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


# Create an instance of the NaiveBayesClassifier
classifier = NaiveBayesClassifier()

# Define the /train route
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

@app.route('/classify', methods=['POST'])
def classify():
    sentence = request.json.get('sentence')
    logging.debug("Sentence to classify: %s", sentence)
    try:
        results = classifier.classify(sentence)
        sorted_results = sorted(results.items(), key=lambda x: x[1], reverse=True)
        logging.info("Classification completed successfully.")
        return jsonify({"classification": sorted_results[0][0], "details": results})
    except Exception as e:
        logging.error("Failed to classify the sentence: %s", e)
        return jsonify({"error": f"Failed to classify the sentence: {str(e)}"}), 500

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


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
