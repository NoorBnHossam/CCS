import React from 'react';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TrainingData } from '../types/data';

interface DataTableProps {
  data: TrainingData[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  if (!data.length) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <TableHeader headers={headers} />
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <TableRow key={index} row={row} headers={headers} />
          ))}
        </tbody>
      </table>
    </div>
  );
};