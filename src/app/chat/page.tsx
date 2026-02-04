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

// Define tools inline
const rowSchema = z.object({}).passthrough();

const tools = [
  {
    name: 'getDatabaseSchema',
    description: 'Call this FIRST before any database query. Returns all table names and column names/types in the database.',
    tool: async () => {
      const response = await fetch('/api/schema');
      return response.json();
    },
    inputSchema: z.object({}),
    outputSchema: z.object({ schema: z.string() }),
  },
  {
    name: 'executeSQL',
    description: 'Execute SQL SELECT query and return results. Use this to get data before Python transformation.',
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
    description: `Execute Python code to transform data. Use AFTER getting SQL results. 
      Common operations: predict/forecast trends, calculate new columns, aggregate data, filter/sort.
      The code will be executed on the data and return transformed results.`,
    tool: async (params: { code: string; data: any[] }) => {
      const response = await fetch('/api/python', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return response.json();
    },
    inputSchema: z.object({ 
      code: z.string().describe('Python code to execute'),
      data: z.array(rowSchema).describe('Input data from SQL query')
    }),
    outputSchema: z.object({
      success: z.boolean(),
      result: z.array(rowSchema).optional(),
      newColumns: z.array(z.string()).optional(),
      rowsProcessed: z.number(),
      rowsReturned: z.number(),
    }),
  }
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
