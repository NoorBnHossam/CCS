import { useState } from "react";
import { Brain, ArrowLeft } from "lucide-react";
import { DataInput } from "../components/DataInput";
import { DataTable } from "../components/DataTable";
import { PredictionForm } from "../components/PredictionForm";
import { ErrorMessage } from "../components/ErrorMessage";
import { TrainingData, PredictionInput, DataHeaders } from "../types/data";
import { predictClass } from "../utils/api";
import { Link } from "react-router-dom";

function App() {
  const [data, setData] = useState<TrainingData[]>([]);
  const [headers, setHeaders] = useState<DataHeaders | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDataSubmit = (
    newData: TrainingData[],
    newHeaders: DataHeaders
  ) => {
    setData(newData);
    setHeaders(newHeaders);
    setPrediction(null);
    setError(null);
  };

  const handlePredict = async (values: PredictionInput) => {
    try {
      setError(null);
      const result = await predictClass(
        data,
        values,
        headers?.targetColumn || "class"
      );
      setPrediction(result.prediction);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Gaussian Naive Bayes Classifier
          </h1>
          <p className="text-gray-600">
            Upload your data or enter it manually to make predictions
          </p>
        </div>

        {error && (
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <DataInput onDataSubmit={handleDataSubmit} />
        </div>

        {data.length > 0 && headers && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Training Data
              </h2>
              <DataTable data={data} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <PredictionForm
                features={headers.features}
                onPredict={handlePredict}
              />
              {prediction && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-center text-lg">
                    <span className="font-medium">
                      Predicted {headers.targetColumn}:
                    </span>{" "}
                    <span className="text-blue-600 font-bold">
                      {prediction}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
