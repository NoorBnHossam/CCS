import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { ErrorMessage } from './ErrorMessage';
import { ErrorState } from '../utils/types';

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  isLoading?: boolean;
}

export function FileUpload({ onUpload, isLoading }: FileUploadProps) {
  const [error, setError] = useState<ErrorState | null>(null);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    
    if (!file.name.endsWith('.csv')) {
      setError({
        message: 'Invalid file type',
        details: 'Please upload a CSV file'
      });
      return;
    }

    try {
      await onUpload(file);
    } catch (err: any) {
      setError({
        message: 'Upload failed',
        details: err.message
      });
    }
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`border-2 border-dashed border-purple-300 rounded-lg p-8 text-center 
          hover:border-purple-500 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex flex-col items-center gap-4">
          <Upload className="w-12 h-12 text-purple-500" />
          <div>
            <p className="text-gray-600 mb-2">
              Drop your CSV file here or click to upload
            </p>
            <p className="text-sm text-gray-500">
              The last column will be used as the target class
            </p>
          </div>
          <label className={`bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 
            cursor-pointer transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            Choose File
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileInput}
              disabled={isLoading}
            />
          </label>
        </div>
      </div>
      {error && <ErrorMessage {...error} />}
    </div>
  );
}