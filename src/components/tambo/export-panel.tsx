"use client";

import { z } from 'zod';
import { useState } from 'react';

export const exportPanelSchema = z.object({
  data: z.array(z.object({}).passthrough()).describe('Data to export'),
  filename: z.string().describe('Name of the file without extension'),
  formats: z.array(z.enum(['csv', 'json'])).optional().describe('Available export formats - defaults to both'),
});

export function ExportPanel({ data, filename, formats }: z.infer<typeof exportPanelSchema>) {
  const [exported, setExported] = useState(false);
  
  // Default to both formats if not specified
  const availableFormats = formats || ['csv', 'json'];

  const downloadCSV = () => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((row: z.infer<typeof exportPanelSchema>['data'][number]) => 
      Object.values(row).map(val => 
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const downloadJSON = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2002);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow border mt-4">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        📊 Export Data
        {exported && <span className="text-green-600 text-xs">✓ Downloaded!</span>}
      </h3>
      
      <div className="flex gap-2">
        {availableFormats.includes('csv') && (
          <button
            onClick={downloadCSV}
            className="flex-1 bg-green-600 text-white text-sm py-2 px-4 rounded hover:bg-green-700 transition-colors"
          >
            Download CSV
          </button>
        )}
        {availableFormats.includes('json') && (
          <button
            onClick={downloadJSON}
            className="flex-1 bg-blue-600 text-white text-sm py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Download JSON
          </button>
        )}
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        {data?.length || 0} rows ready for export
      </p>
    </div>
  );
}
