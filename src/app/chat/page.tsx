"use client";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import ComponentsCanvas from "@/components/ui/components-canvas";
import { InteractableCanvasDetails } from "@/components/ui/interactable-canvas-details";
import { InteractableTabs } from "@/components/ui/interactable-tabs";
import { components } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import { TamboMcpProvider } from "@tambo-ai/react/mcp";
import { useSyncExternalStore } from "react";
import { z } from "zod";

const STORAGE_KEY = "tambo-demo-context-key";

function getContextKey(): string {
  let key = localStorage.getItem(STORAGE_KEY);
  if (!key) {
    key = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, key);
  }
  return key;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function useContextKey(): string | null {
  return useSyncExternalStore(subscribe, getContextKey, () => null);
}

const rowSchema = z.object({}).passthrough();

const tools = [
  // Database Tools
  {
    name: 'getDatabaseSchema',
    description: 'Get database schema with tables and columns',
    tool: async () => {
      const response = await fetch('/api/schema');
      const data = await response.json();
      return { schema: data.schema, tables: data.tables };
    },
    inputSchema: z.object({}),
    outputSchema: z.object({
      schema: z.string(),
      tables: z.array(z.any())
    }),
  },
  {
    name: 'executeSQL',
    description: 'Execute SQL SELECT query on local database',
    tool: async (params: { query: string }) => {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return response.json();
    },
    inputSchema: z.object({ query: z.string() }),
    outputSchema: z.object({
      results: z.array(rowSchema),
      columns: z.array(z.string()),
      rowCount: z.number(),
    }),
  },
  {
    name: 'executePython',
    description: 'Execute Python code to transform data',
    tool: async (params: { code: string; data: any[] }) => {
      const response = await fetch('/api/python', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return response.json();
    },
    inputSchema: z.object({ code: z.string(), data: z.array(rowSchema) }),
    outputSchema: z.object({
      success: z.boolean(),
      result: z.array(rowSchema).optional(),
      newColumns: z.array(z.string()).optional(),
    }),
  },

  // MCP Integrations (Shells for now)
    // 1. Neon - Demo mode (working)
    {
    name: 'showNeonDemo',
    description: 'Show interactive Neon database demo with sample data',
    tool: async () => ({
        demoMode: true,
        databaseName: 'demo-production-db',
        tables: [
        { name: 'users', rowCount: 4 },
        { name: 'orders', rowCount: 5 },
        { name: 'products', rowCount: 4 },
        ],
    }),
    inputSchema: z.object({}),
    outputSchema: z.object({
        demoMode: z.literal(true),
        databaseName: z.string(),
        tables: z.array(z.object({ name: z.string(), rowCount: z.number() })),
    }),
    },

    // 2. Brave Search - Mock for now
    {
    name: 'braveSearch',
    description: 'Search the web for information and benchmarks',
    tool: async (params: { query: string }) => ({
        query: params.query,
        results: [
        { title: `Results for "${params.query}"`, url: '#', snippet: 'Search integration pending - this is a demo result' }
        ],
    }),
    inputSchema: z.object({ query: z.string() }),
    outputSchema: z.object({
        query: z.string(),
        results: z.array(z.object({ title: z.string(), url: z.string(), snippet: z.string() })),
    }),
    },

    // 3. GitHub - Mock for now
    {
    name: 'githubConnect',
    description: 'Connect to GitHub account',
    tool: async () => ({
        service: 'github',
        status: 'connected',
        accountName: 'demo-user',
    }),
    inputSchema: z.object({}),
    outputSchema: z.object({
        service: z.literal('github'),
        status: z.enum(['connected', 'error']),
        accountName: z.string().optional(),
    }),
    },

    // 4. Airtable - Mock for now
    {
    name: 'airtableConnect',
    description: 'Connect to Airtable',
    tool: async () => ({
        service: 'airtable',
        status: 'connected',
        accountName: 'Demo Workspace',
    }),
    inputSchema: z.object({}),
    outputSchema: z.object({
        service: z.literal('airtable'),
        status: z.enum(['connected', 'error']),
        accountName: z.string().optional(),
    }),
    },

    // 5. Notion - Mock for now
    {
    name: 'notionConnect',
    description: 'Connect to Notion workspace',
    tool: async () => ({
        service: 'notion',
        status: 'connected',
        accountName: 'Demo Workspace',
    }),
    inputSchema: z.object({}),
    outputSchema: z.object({
        service: z.literal('notion'),
        status: z.enum(['connected', 'error']),
        accountName: z.string().optional(),
    }),
    },
];

export default function Home() {
  const mcpServers = useMcpServers();
  const contextKey = useContextKey();

  if (!contextKey) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      <TamboProvider
        apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
        tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL!}
        components={components}
        tools={tools}
        mcpServers={mcpServers}
        contextKey={contextKey}
      >
        <TamboMcpProvider>
          <div className="flex h-full overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <MessageThreadFull />
            </div>
            <div className="hidden md:block w-[60%] overflow-auto">
              <InteractableTabs interactableId="Tabs" />
              <InteractableCanvasDetails interactableId="CanvasDetails" />
              <ComponentsCanvas className="h-full" />
            </div>
          </div>
        </TamboMcpProvider>
      </TamboProvider>
    </div>
  );
}
