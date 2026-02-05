"use client";

import { z } from 'zod';
import { useState } from 'react';

export const neonDemoSchema = z.object({
  demoMode: z.literal(true),
  databaseName: z.string(),
  tables: z.array(z.object({
    name: z.string(),
    rowCount: z.number(),
  })),
  selectedTable: z.string().optional(),
});

// Sample data
const DEMO_DATA: Record<string, Record<string, string | number>[]> = {
  users: [
    { id: 1, name: 'Alice Johnson', email: 'alice@company.com', role: 'admin', created_at: '2024-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@company.com', role: 'user', created_at: '2024-02-20' },
    { id: 3, name: 'Carol White', email: 'carol@company.com', role: 'user', created_at: '2024-03-10' },
  ],
  orders: [
    { id: 101, user_id: 1, product: 'Laptop Pro', amount: 1299.99, status: 'completed', date: '2024-04-01' },
    { id: 102, user_id: 2, product: 'Wireless Mouse', amount: 29.99, status: 'completed', date: '2024-04-02' },
    { id: 103, user_id: 1, product: 'Monitor 4K', amount: 499.99, status: 'pending', date: '2024-04-03' },
  ],
  products: [
    { id: 'P001', name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 15 },
    { id: 'P002', name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock: 150 },
  ],
};

type NeonDemoProps = z.infer<typeof neonDemoSchema>;

export function NeonDemo({ databaseName, selectedTable }: NeonDemoProps) {
  const [activeTable, setActiveTable] = useState(selectedTable || 'users');
  const data = DEMO_DATA[activeTable] || [];
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐘</span>
          <div>
            <h4 className="font-semibold">Neon Database</h4>
            <p className="text-xs text-green-100">{databaseName} • Connected</p>
          </div>
        </div>
      </div>

      <div className="p-3 bg-slate-50 border-b">
        <p className="text-xs text-slate-500 mb-2">Select table:</p>
        <div className="flex gap-2">
          {Object.keys(DEMO_DATA).map((table) => (
            <button
              key={table}
              onClick={() => setActiveTable(table)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors
                ${activeTable === table 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-slate-600 border hover:bg-slate-50'
                }
              `}
            >
              {table}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-auto max-h-64">
        <table className="w-full text-xs">
          <thead className="bg-slate-100 sticky top-0">
            <tr>
              {columns.map((col: string) => (
                <th key={col} className="px-3 py-2 text-left font-semibold text-slate-700 border-b">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx: number) => (
              <tr key={idx} className="border-b hover:bg-slate-50">
                {columns.map((col: string) => (
                  <td key={col} className="px-3 py-2 text-slate-600">
                    {String(row[col] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
