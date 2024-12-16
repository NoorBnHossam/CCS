import { APIError } from './errors';
import { TrainingData, ClassificationResult } from './types';

const API_BASE_URL = 'http://localhost:5000';

export async function trainModel(data: TrainingData) {
  try {
    const response = await fetch(`${API_BASE_URL}/train`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new APIError('Training failed', response.status, error);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError('Network error during training', 500);
  }
}

export async function classifyText(sentence: string): Promise<ClassificationResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/classify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sentence }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new APIError('Classification failed', response.status, error);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError('Network error during classification', 500);
  }
}