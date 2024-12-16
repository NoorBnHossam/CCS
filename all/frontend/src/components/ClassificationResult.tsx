import React from 'react';
import { ClassificationResult as ClassificationResultType } from '../utils/types';

interface ClassificationResultProps {
  result: ClassificationResultType;
}

export function ClassificationResult({ result }: ClassificationResultProps) {
  return (
    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
      <h3 className="text-lg font-semibold text-purple-800 mb-2">Classification Result</h3>
      <p className="text-purple-900 mb-4">
        Predicted class: <span className="font-bold">{result.classification}</span>
      </p>
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-purple-700">Probability Scores:</h4>
        {Object.entries(result.details).map(([category, score]) => (
          <div key={category} className="flex justify-between text-sm">
            <span className="text-gray-600">{category}:</span>
            <span className="font-mono text-purple-800">{score.toFixed(4)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}