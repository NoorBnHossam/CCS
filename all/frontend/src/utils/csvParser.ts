import { TrainingData, DataHeaders } from "../types/data";

export function parseCSVData(text: string): {
  data: TrainingData[];
  headers: DataHeaders;
} {
  try {
    const rows = text.split("\n").filter((row) => row.trim());
    const headers = rows[0]
      .toLowerCase()
      .split(",")
      .map((h) => h.trim());

    if (headers.length < 2) {
      throw new Error(
        "CSV must contain at least one feature column and a target column"
      );
    }

    const features = headers.slice(0, -1);
    const targetColumn = headers[headers.length - 1];

    const data = rows.slice(1).map((row, rowIndex) => {
      const values = row.split(",").map((v) => v.trim());
      const rowData: TrainingData = {};

      headers.forEach((header, index) => {
        // Validate that feature columns contain numeric values
        if (index < headers.length - 1) {
          const value = values[index];
          if (isNaN(Number(value))) {
            throw new Error(
              `Invalid numeric value "${value}" at row ${
                rowIndex + 2
              }, column "${header}"`
            );
          }
        }
        rowData[header] = values[index];
      });

      return rowData;
    });

    return {
      data,
      headers: {
        features,
        targetColumn,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse CSV: ${error.message}`);
    }
    throw new Error("Failed to parse CSV: Unknown error");
  }
}
