import React, { useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { PredictionInput } from "../types/data";
import { FeatureInput } from "./FeatureInput";
import { useFeatureValues } from "../hooks/useFeatureValues";

interface PredictionFormProps {
  features: string[];
  onPredict: (values: PredictionInput) => void;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  features,
  onPredict,
}) => {
  const { values, handleValueChange, resetValues } = useFeatureValues(features);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      const numericValues: PredictionInput = {};

      for (const key of features) {
        const value = values[key].trim();
        if (!value.match(/^-?\d*\.?\d+$/)) {
          setError(
            `Invalid numeric value for feature "${key}": "${values[key]}"`
          );
          return;
        }
        numericValues[key] = parseFloat(value);
      }

      onPredict(numericValues);
      resetValues();
    },
    [values, onPredict, resetValues, features]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Enter New Values to Predict
      </h3>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <FeatureInput
            key={feature}
            feature={feature}
            value={values[feature]}
            onChange={handleValueChange}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Predict
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </form>
  );
};
