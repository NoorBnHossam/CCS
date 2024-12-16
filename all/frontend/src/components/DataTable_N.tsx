import React from "react";

interface DataTableProps {
  data: Array<[string, string]>;
}

export function DataTable({ data }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-purple-100">
            <th className="p-4 border-b border-purple-200 text-purple-800">
              Text
            </th>
            <th className="p-4 border-b border-purple-200 text-purple-800">
              Label
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(([text, label], index) => (
            <tr key={index} className="hover:bg-purple-50">
              <td className="p-4 border-b border-purple-100">{text}</td>
              <td className="p-4 border-b border-purple-100">
                <span className="inline-block px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                  {label}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
