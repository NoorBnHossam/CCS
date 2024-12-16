import {
  TrainingData,
  PredictionInput,
  PredictionResponse,
} from "../types/data";

const API_URL = "http://localhost:8000";

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function predictClass(
  data: TrainingData[],
  input: PredictionInput,
  targetColumn: string
): Promise<PredictionResponse> {
  try {
    console.log("Sending data:", {
      data,
      class_column: targetColumn,
      input_data: input,
    });

    const response = await fetch(`${API_URL}/classify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
        class_column: targetColumn,
        input_data: input,
      }),
    });

    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.error) {
      throw new ApiError(result.error);
    }

    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      "Failed to connect to the server. Please check if the backend is running."
    );
  }
}
