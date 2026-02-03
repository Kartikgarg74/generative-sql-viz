import { z } from 'zod';

// These will be actual server actions
'use server';

import { executeQuery, getDatabaseSchema } from '@/db/connection';

const rowSchema = z.object({}).passthrough();

export async function getDatabaseSchemaAction() {
  'use server';
  return { schema: getDatabaseSchema() };
}

export async function executeSQLAction(params: { query: string }) {
  'use server';
  if (!params.query.trim().toLowerCase().startsWith('select')) {
    throw new Error('Only SELECT queries allowed');
  }
  const { results, columns } = executeQuery(params.query);
  return { results, columns, rowCount: results.length };
}

// Tool definitions for Tambo (client-side)
export const tools = [
  {
    name: 'getDatabaseSchema',
    description: 'Call this FIRST before any database query. Returns all table names and column names/types in the database.',
    tool: getDatabaseSchemaAction,
    inputSchema: z.object({}),
    outputSchema: z.object({ schema: z.string() }),
  },
  {
    name: 'executeSQL',
    description: 'Execute a SQL SELECT query after checking schema. Returns data rows and column names.',
    tool: executeSQLAction,
    inputSchema: z.object({ query: z.string() }),
    outputSchema: z.object({
      results: z.array(rowSchema),
      columns: z.array(z.string()),
      rowCount: z.number(),
    }),
  }
];
