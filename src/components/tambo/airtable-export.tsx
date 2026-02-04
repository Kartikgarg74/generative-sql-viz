"use client";

import { z } from 'zod';

export const airtableExportSchema = z.object({
  rows: z.number(),
  destination: z.enum(['airtable', 'sheets']),
  status: z.string(),
  url: z.string().optional(),
});

export function AirtableExport({ rows, destination, status, url }: any) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{destination === 'sheets' ? '📊' : '📋'}</span>
        <h4 className="font-semibold">
          Export to {destination === 'sheets' ? 'Google Sheets' : 'Airtable'}
        </h4>
      </div>
      <p className="text-sm text-slate-600 mb-2">{rows} rows exported</p>
      <p className="text-xs text-green-600">{status}</p>
      {url && (
        <a href={url} target="_blank" className="text-blue-600 text-xs hover:underline block mt-2">
          Open →
        </a>
      )}
    </div>
  );
}
