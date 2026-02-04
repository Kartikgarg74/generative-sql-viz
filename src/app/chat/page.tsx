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
  {
    name: 'connectNeonDatabase',
    description: 'Connect to external Neon PostgreSQL database using connection string',
    tool: async (params: { connectionString: string; query: string }) => {
      const response = await fetch('/api/neon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return response.json();
    },
    inputSchema: z.object({ 
      connectionString: z.string().describe('Neon connection string'),
      query: z.string().describe('SQL query to execute')
    }),
    outputSchema: z.object({
      results: z.array(rowSchema),
      columns: z.array(z.string()),
      rowCount: z.number(),
    }),
  },
  {
    name: 'braveSearch',
    description: 'Search the web using Brave search engine for research and benchmarking',
    tool: async (params: { query: string }) => {
      const response = await fetch('/api/brave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return response.json();
    },
    inputSchema: z.object({ query: z.string() }),
    outputSchema: z.object({
      results: z.array(z.object({
        title: z.string(),
        url: z.string(),
        snippet: z.string()
      })),
      query: z.string(),
    }),
  },
  {
    name: 'githubAction',
    description: 'Perform GitHub action like view repo, create gist, or create issue',
    tool: async (params: { action: string; repo: string; data?: any }) => {
      const response = await fetch('/api/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return response.json();
    },
    inputSchema: z.object({ 
      action: z.enum(['view', 'create', 'gist']),
      repo: z.string(),
      data: z.any().optional()
    }),
    outputSchema: z.object({
      status: z.string(),
      action: z.string(),
      repo: z.string(),
      url: z.string().optional(),
    }),
  },
  {
    name: 'exportToAirtable',
    description: 'Export data to Airtable or Google Sheets',
    tool: async (params: { data: any[]; destination: 'airtable' | 'sheets' }) => {
      const response = await fetch('/api/airtable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return response.json();
    },
    inputSchema: z.object({ 
      data: z.array(rowSchema),
      destination: z.enum(['airtable', 'sheets'])
    }),
    outputSchema: z.object({
      status: z.string(),
      rows: z.number(),
      destination: z.string(),
      url: z.string().optional(),
    }),
  },
  {
    name: 'createNotionPage',
    description: 'Create a page in Notion with analysis results',
    tool: async (params: { title: string; content: string; databaseId?: string }) => {
      const response = await fetch('/api/notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return response.json();
    },
    inputSchema: z.object({ 
      title: z.string(),
      content: z.string(),
      databaseId: z.string().optional()
    }),
    outputSchema: z.object({
      status: z.string(),
      title: z.string(),
      pageUrl: z.string(),
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
