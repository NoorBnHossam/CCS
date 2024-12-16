import React from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

interface DataTableProps {
  data: number[][];
  headers: string[];
  error?: string | null;
  onCellChange: (row: number, col: number, value: number) => void;
  onHeaderChange: (col: number, value: string) => void;
  onAddRow: () => void;
  onDeleteRow: (row: number) => void;
  onAddColumn: () => void;
  onDeleteColumn: (col: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  headers,
  error,
  onCellChange,
  onHeaderChange,
  onAddRow,
  onDeleteRow,
  onAddColumn,
  onDeleteColumn,
}) => {
  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="w-12 px-6 py-3 bg-gray-50">#</th>
              {headers.map((header, idx) => (
                <th key={idx} className="px-6 py-3">
                  <input
                    className="w-full border-b focus:border-blue-500 px-2 py-1"
                    value={header}
                    onChange={(e) => onHeaderChange(idx, e.target.value)}
                  />
                </th>
              ))}
              <th className="w-12 px-6 py-3">
                <button
                  onClick={onAddColumn}
                  className="p-1 text-blue-600 hover:bg-gray-100 rounded"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx}>
                <td className="px-6 py-4 text-gray-500">#{rowIdx + 1}</td>
                {row.map((cell, colIdx) => (
                  <td key={colIdx} className="px-6 py-4">
                    <input
                      type="number"
                      className="w-16 text-center border px-2 py-1"
                      value={cell}
                      onChange={(e) =>
                        onCellChange(
                          rowIdx,
                          colIdx,
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </td>
                ))}
                <td>
                  <button
                    onClick={() => onDeleteRow(rowIdx)}
                    className="p-1 text-red-500 hover:bg-gray-100 rounded"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="px-6 py-4">
                <button
                  onClick={onAddRow}
                  className="p-1 text-blue-600 hover:bg-gray-100 rounded"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </td>
              {headers.map((_, idx) => (
                <td key={idx} className="px-6 py-4">
                  <button
                    onClick={() => onDeleteColumn(idx)}
                    className="p-1 text-red-500 hover:bg-gray-100 rounded"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              ))}
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
