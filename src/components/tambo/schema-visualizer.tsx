"use client";

import { z } from 'zod';

export const schemaVisualizerSchema = z.object({
  tables: z.array(z.object({
    name: z.string(),
    columns: z.array(z.object({
      name: z.string(),
      type: z.string(),
      isPrimaryKey: z.boolean().optional(),
      isForeignKey: z.boolean().optional(),
    })),
    rowCount: z.number().optional(),
  })).describe('Database tables with their columns'),
});

export function SchemaVisualizer({ tables }: { tables?: any[] }) {
  if (!tables || !Array.isArray(tables) || tables.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-2">🗄️ Database Schema</h3>
        <p className="text-slate-500">No tables found or schema not loaded.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow border">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🗄️ Database Schema
        <span className="text-sm font-normal text-slate-500">({tables.length} tables)</span>
      </h3>
      
      <div className="grid gap-4">
        {tables.map((table, tableIndex) => (
          <div key={`table-${table.name}-${tableIndex}`} className="border rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-slate-100 px-4 py-2 border-b flex justify-between items-center">
              <span className="font-mono font-semibold text-slate-800">{table.name}</span>
              {table.rowCount !== undefined && table.rowCount > 0 && (
                <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                  {table.rowCount} rows
                </span>
              )}
            </div>
            
            {/* Columns */}
            <div className="divide-y">
              {table.columns?.map((col: any, colIndex: number) => (
                <div 
                  key={`col-${table.name}-${col.name}-${colIndex}`} 
                  className="px-4 py-2 flex justify-between items-center hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2">
                    {col.isPrimaryKey && (
                      <span className="text-xs bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded font-semibold">PK</span>
                    )}
                    {col.isForeignKey && (
                      <span className="text-xs bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded font-semibold">FK</span>
                    )}
                    <span className="font-mono text-sm text-slate-700">{col.name}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">
                    {col.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
