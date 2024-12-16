import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { InputField } from "../components/InputField";
import { ResultCard } from "../components/ResultCard";
import {
  calculateRegression,
  parseInputValues,
  predictX,
  predictY,
} from "../utils/linearRegression";

export function LinearRegression() {
  const [xValues, setXValues] = useState<string>("");
  const [yValues, setYValues] = useState<string>("");
  const [predictValue, setPredictValue] = useState<string>("");
  const [predictType, setPredictType] = useState<"X" | "Y">("Y");
  const [result, setResult] = useState<{
    slope: number;
    intercept: number;
    prediction?: {
      input: number;
      output: number;
      type: "X" | "Y";
    };
  } | null>(null);

  const handleCalculate = () => {
    const x = parseInputValues(xValues);
    const y = parseInputValues(yValues);

    if (x.length !== y.length) {
      alert("X and Y must have the same number of values");
      return;
    }

    if (x.length < 2) {
      alert("Please provide at least 2 pairs of values");
      return;
    }

    const { slope, intercept } = calculateRegression(x, y);
    const prediction = predictValue
      ? {
          input: Number(predictValue),
          output:
            predictType === "Y"
              ? predictY(Number(predictValue), slope, intercept)
              : predictX(Number(predictValue), slope, intercept),
          type: predictType,
        }
      : undefined;

    setResult({ slope, intercept, prediction });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Linear Regression Calculator
          </h1>

          <div className="grid gap-6 mb-8">
            <InputField
              label="X Values (comma-separated)"
              value={xValues}
              onChange={setXValues}
              placeholder="1,2,3,4,5"
            />

            <InputField
              label="Y Values (comma-separated)"
              value={yValues}
              onChange={setYValues}
              placeholder="2,4,6,8,10"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Predict
                </label>
                <select
                  value={predictType}
                  onChange={(e) => setPredictType(e.target.value as "X" | "Y")}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="Y">Y from X</option>
                  <option value="X">X from Y</option>
                </select>
              </div>

              <InputField
                label={`Value to predict ${
                  predictType === "Y" ? "Y from" : "X from"
                }`}
                value={predictValue}
                onChange={setPredictValue}
                placeholder={
                  predictType === "Y" ? "Enter X value" : "Enter Y value"
                }
              />
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Calculate
          </button>

          {result && <ResultCard {...result} />}
        </div>
      </div>
    </div>
  );
}
