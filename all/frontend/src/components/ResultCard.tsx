import React from "react";

interface ResultCardProps {
  prediction?: {
    input: number;
    output: number;
    type: "X" | "Y";
  };
}

export function ResultCard({ prediction }: ResultCardProps) {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Results:</h3>
      <div className="space-y-2">
        {prediction && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Prediction:</h4>
            <p className="text-gray-700">
              Given {prediction.type === "Y" ? "X" : "Y"} ={" "}
              {prediction.input.toFixed(4)}
            </p>
            <p className="text-gray-700 font-semibold">
              Predicted {prediction.type} = {prediction.output.toFixed(4)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
