"use client";

import { z } from 'zod';

export const neonStatusSchema = z.object({
  connected: z.boolean(),
  database: z.string().optional(),
  tables: z.array(z.string()).optional(),
  error: z.string().optional(),
});

export function NeonStatus({ connected, database, tables, error }: any) {
  return (
    <div className={`p-4 rounded-lg border ${connected ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{connected ? '🔌' : '⚪'}</span>
        <div>
          <h4 className="font-semibold text-sm">
            {connected ? 'Connected to Neon' : 'Neon Database'}
          </h4>
          {connected && database && (
            <p className="text-xs text-slate-600">{database}</p>
          )}
          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}
        </div>
      </div>
      {connected && tables && tables.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tables.map((t: string) => (
            <span key={t} className="text-xs bg-white px-2 py-0.5 rounded border">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
