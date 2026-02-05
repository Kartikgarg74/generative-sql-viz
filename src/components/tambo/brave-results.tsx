"use client";

import { z } from 'zod';

export const braveResultsSchema = z.object({
  query: z.string(),
  results: z.array(z.object({
    title: z.string(),
    url: z.string(),
    snippet: z.string().optional(),
  })),
});

export function BraveResults({ query, results }: z.infer<typeof braveResultsSchema>) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border">
      <h4 className="font-semibold mb-2 flex items-center gap-2">
        🔍 Web Search: &quot;{query}&quot;
      </h4>
      <div className="space-y-2">
        {results?.map((r: z.infer<typeof braveResultsSchema>['results'][number], idx: number) => (
          <div key={idx} className="p-2 bg-slate-50 rounded text-sm">
            <a href={r.url} target="_blank" className="text-blue-600 hover:underline font-medium">
              {r.title}
            </a>
            <p className="text-slate-600 text-xs mt-1">{r.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
