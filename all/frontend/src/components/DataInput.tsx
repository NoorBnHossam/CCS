import React, { useState } from 'react';
import { Upload, Table as TableIcon, Plus } from 'lucide-react';
import { TrainingData, DataHeaders } from '../types/data';
import { parseCSVData } from '../utils/csvParser';

interface DataInputProps {
  onDataSubmit: (data: TrainingData[], headers: DataHeaders) => void;
}

export const DataInput: React.FC<DataInputProps> = ({ onDataSubmit }) => {
  const [inputMethod, setInputMethod] = useState<'upload' | 'manual'>('upload');
  const [manualData, setManualData] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const { data, headers } = parseCSVData(text);
          onDataSubmit(data, headers);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const handleManualSubmit = () => {
    setError(null);
    try {
      const { data, headers } = parseCSVData(manualData);
      onDataSubmit(data, headers);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setInputMethod('upload')}
          className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
            inputMethod === 'upload'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Upload className="w-5 h-5 mr-2" />
          Upload CSV
        </button>
        <button
          onClick={() => setInputMethod('manual')}
          className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
            inputMethod === 'manual'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <TableIcon className="w-5 h-5 mr-2" />
          Manual Entry
        </button>
      </div>

      {inputMethod === 'upload' ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <span className="text-gray-600">
              Click to upload or drag and drop a CSV file
            </span>
            <span className="text-sm text-gray-500 mt-2">
              The last column will be used as the target class
            </span>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <textarea
            value={manualData}
            onChange={(e) => setManualData(e.target.value)}
            placeholder="feature1,feature2,feature3,class&#10;1.2,0.5,2.1,A&#10;2.3,1.1,1.8,B&#10;..."
            className="w-full h-48 p-4 border rounded-lg font-mono"
          />
          <div className="flex justify-center">
            <button
              onClick={handleManualSubmit}
              className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Submit Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
};