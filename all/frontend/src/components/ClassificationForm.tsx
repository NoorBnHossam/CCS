import React, { useState } from 'react';
import { classifyText } from '../utils/api';
import { ClassificationResult, ErrorState } from '../utils/types';
import { ErrorMessage } from './ErrorMessage';
import { ClassificationResult as ResultDisplay } from './ClassificationResult';

export function ClassificationForm() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<ErrorState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await classifyText(text);
      setResult(result);
    } catch (err: any) {
      setError({
        message: 'Classification failed',
        details: err.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
            Enter text to classify
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-purple-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={3}
            placeholder="Enter the text you want to classify..."
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || !text.trim()}
        >
          {isLoading ? 'Classifying...' : 'Classify'}
        </button>
      </form>

      {error && <ErrorMessage {...error} />}
      {result && <ResultDisplay result={result} />}
    </div>
  );
}