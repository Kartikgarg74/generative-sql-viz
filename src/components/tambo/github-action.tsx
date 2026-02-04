"use client";

import { z } from 'zod';

export const githubActionSchema = z.object({
  action: z.enum(['view', 'create', 'gist']),
  repo: z.string(),
  status: z.string(),
  url: z.string().optional(),
  description: z.string().optional(),
});

export function GitHubAction({ action, repo, status, url, description }: any) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-lg font-mono text-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">🐙</span>
        <span className="font-semibold">GitHub {action}</span>
      </div>
      <p className="text-slate-300 mb-2">{repo}</p>
      <p className="text-green-400 text-xs">{status}</p>
      {url && (
        <a href={url} target="_blank" className="text-blue-400 text-xs hover:underline block mt-2">
          View on GitHub →
        </a>
      )}
      {description && (
        <p className="text-slate-400 text-xs mt-2">{description}</p>
      )}
    </div>
  );
}
