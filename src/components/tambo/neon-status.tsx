"use client";

import { z } from 'zod';
import { useState } from 'react';



export const neonStatusSchema = z.object({
  connected: z.boolean(),
  database: z.string().optional(),
  tables: z.array(z.string()).optional(),
  error: z.string().optional(),
  rowCount: z.number().optional(),
  columns: z.array(z.string()).optional(),
});

type NeonStatusProps = z.infer<typeof neonStatusSchema>;

export function NeonStatus({ connected, database, tables, error, rowCount, columns }: NeonStatusProps) {

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-2xl">❌</span>
          <div>
            <h4 className="font-semibold text-sm text-red-800">Connection Failed</h4>
            <p className="text-xs text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg border ${connected ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{connected ? '✅' : '⚪'}</span>
          <div>
            <h4 className="font-semibold text-sm">
              {connected ? 'Connected to Neon' : 'Neon Database'}
            </h4>
            {connected && database && (
              <p className="text-xs text-slate-600">Database: {database}</p>
            )}
          </div>
        </div>
        {connected && (
          <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
            Live
          </span>
        )}
      </div>
      
      {connected && tables && tables.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-slate-500 mb-2">Available tables:</p>
          <div className="flex flex-wrap gap-1">
            {tables.map((t: string, idx: number) => (
              <span key={`${t}-${idx}`} className="text-xs bg-white px-2 py-1 rounded border border-green-200 text-green-700">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {connected && rowCount !== undefined && (
        <div className="mt-2 pt-2 border-t border-green-200">
          <p className="text-xs text-green-700">
            ✓ Query executed successfully ({rowCount} rows)
          </p>
          {columns && columns.length > 0 && (
            <p className="text-xs text-slate-500 mt-1">
              Columns: {columns.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
