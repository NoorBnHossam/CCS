import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { DataTable } from './components/DataTable';
import { ClassificationForm } from './components/ClassificationForm';
import { ErrorMessage } from './components/ErrorMessage';
import { Header } from './components/Header';
import { Container } from './components/Container';
import { trainModel } from './utils/api';
import { TrainingData, ErrorState } from './utils/types';

function App() {
  const [data, setData] = useState<TrainingData>([]);
  const [trained, setTrained] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setError(null);
    setIsLoading(true);

    try {
      const text = await file.text();
      const rows = text.split('\n')
        .filter(row => row.trim())
        .map(row => {
          const lastCommaIndex = row.lastIndexOf(',');
          if (lastCommaIndex === -1) {
            throw new Error('Invalid CSV format. Each row must have a comma-separated label.');
          }
          const text = row.slice(0, lastCommaIndex).trim();
          const label = row.slice(lastCommaIndex + 1).trim();
          if (!text || !label) {
            throw new Error('Invalid CSV format. Text and label cannot be empty.');
          }
          return [text, label] as [string, string];
        });

      setData(rows);
      await trainModel(rows);
      setTrained(true);
    } catch (err: any) {
      setError({
        message: 'Training failed',
        details: err.message
      });
      setData([]);
      setTrained(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <Container>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
          <h2 className="text-xl font-semibold mb-6 text-purple-800 flex items-center">
            <span className="bg-purple-100 rounded-full p-2 mr-3">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </span>
            Training Data
          </h2>
          <FileUpload onUpload={handleFileUpload} isLoading={isLoading} />
          {error && <ErrorMessage {...error} />}
          {data.length > 0 && (
            <div className="mt-6">
              <DataTable data={data} />
            </div>
          )}
        </div>

        {trained && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
            <h2 className="text-xl font-semibold mb-6 text-purple-800 flex items-center">
              <span className="bg-purple-100 rounded-full p-2 mr-3">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </span>
              Classify New Text
            </h2>
            <ClassificationForm />
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;