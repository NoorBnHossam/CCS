import React from 'react';
import { TrainingData } from '../types/data';

interface TableRowProps {
  row: TrainingData;
  headers: string[];
}

export const TableRow: React.FC<TableRowProps> = ({ row, headers }) => (
  <tr>
    {headers.map((header) => (
      <td
        key={`${header}`}
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
      >
        {row[header]}
      </td>
    ))}
  </tr>
);