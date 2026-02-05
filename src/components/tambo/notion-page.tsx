"use client";

import { z } from 'zod';

export const notionPageSchema = z.object({
  title: z.string(),
  pageUrl: z.string(),
  status: z.string(),
  blocks: z.number().optional(),
});

type NotionPageProps = z.infer<typeof notionPageSchema>;

export function NotionPage({ title, pageUrl, status, blocks }: NotionPageProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">📝</span>
        <h4 className="font-semibold">Notion Page Created</h4>
      </div>
      <p className="text-sm font-medium text-slate-800 mb-1">{title}</p>
      <p className="text-xs text-slate-500 mb-2">{status}</p>
      {blocks && (
        <p className="text-xs text-slate-400">{blocks} blocks added</p>
      )}
      <a 
        href={pageUrl} 
        target="_blank" 
        className="inline-block mt-2 text-sm bg-slate-800 text-white px-3 py-1 rounded hover:bg-slate-700"
      >
        Open in Notion →
      </a>
    </div>
  );
}
