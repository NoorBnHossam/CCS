import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function NaiveBayes() {
  const [features, setFeatures] = useState<string>("");
  const [priorProbability, setPriorProbability] = useState<string>("");
  const [likelihood, setLikelihood] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculateNaiveBayes = () => {
    const featuresList = features.split(",").map(Number);
    const priorProb = Number(priorProbability);
    const likelihoodList = likelihood.split(",").map(Number);

    if (featuresList.length !== likelihoodList.length) {
      alert("Features and likelihood must have the same number of values");
      return;
    }

    const posterior = featuresList.reduce((acc, feature, index) => {
      return acc * (feature * likelihoodList[index]);
    }, priorProb);

    setResult(posterior);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Naive Bayes Calculator
          </h1>

          <div className="grid gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features (comma-separated)
              </label>
              <input
                type="text"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="1,1,0,1"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prior Probability
              </label>
              <input
                type="number"
                value={priorProbability}
                onChange={(e) => setPriorProbability(e.target.value)}
                step="0.01"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Likelihood (comma-separated)
              </label>
              <input
                type="text"
                value={likelihood}
                onChange={(e) => setLikelihood(e.target.value)}
                placeholder="0.8,0.7,0.9,0.6"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            onClick={calculateNaiveBayes}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Calculate
          </button>

          {result !== null && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Result:
              </h3>
              <p className="text-gray-700">
                Posterior Probability: {result.toFixed(6)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
