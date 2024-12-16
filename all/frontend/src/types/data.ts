export interface TrainingData {
  [key: string]: string;
}

export interface PredictionInput {
  [key: string]: number;
}

export interface PredictionResponse {
  prediction: string;
  error?: string;
  statistics?: Record<string, Record<string, { mean: number; sd: number }>>;
}

export interface DataHeaders {
  features: string[];
  targetColumn: string;
}