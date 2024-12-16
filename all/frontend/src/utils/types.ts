export type TrainingData = Array<[string, string]>;

export interface ClassificationResult {
  classification: string;
  details: Record<string, number>;
}

export interface ErrorState {
  message: string;
  details?: string;
}