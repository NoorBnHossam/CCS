import { useState, useCallback } from 'react';
import { PredictionInput } from '../types/data';

export function useFeatureValues(features: string[]) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    features.reduce((acc, feature) => ({ ...acc, [feature]: '0' }), {})
  );

  const handleValueChange = useCallback((feature: string, value: string) => {
    setValues((prev) => ({ ...prev, [feature]: value }));
  }, []);

  const resetValues = useCallback(() => {
    setValues(features.reduce((acc, feature) => ({ ...acc, [feature]: '0' }), {}));
  }, [features]);

  return {
    values,
    handleValueChange,
    resetValues,
  };
}