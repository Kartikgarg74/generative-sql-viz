"use client";

import { z } from 'zod';
import { useState } from 'react';

export const neonConnectSchema = z.object({
  status: z.enum(['idle', 'connecting', 'connected', 'error']),
  databaseName: z.string().optional(),
  tables: z.array(z.string()).optional(),
  message: z.string().optional(),
});

type NeonConnectProps = z.infer<typeof neonConnectSchema>;

export function NeonConnect({ status, databaseName, tables, message }: NeonConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    // Simulate OAuth popup
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const popup = window.open(
      'https://console.neon.tech/app/projects', 
      'Neon OAuth',
      `width=${width},height=${height},left=${left},top=${top}`
    );
    
    setIsConnecting(true);
    
    // Simulate connection after 3 seconds
    setTimeout(() => {
      popup?.close();
      setIsConnecting(false);
      // In real app, this would receive OAuth callback
      window.location.reload();
    }, 3000);
  };

  if (status === 'connected') {
    return (
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">✅</span>
          <div>
            <h4 className="font-semibold text-sm text-green-800">
              Connected to Neon
            </h4>
            <p className="text-xs text-green-600">{databaseName}</p>
          </div>
        </div>
        {tables && tables.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-slate-600 mb-1">Tables:</p>
            <div className="flex flex-wrap gap-1">
              {tables.map((t: string) => (
                <span key={t} className="text-xs bg-white px-2 py-0.5 rounded border text-slate-700">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-2xl">❌</span>
          <div>
            <h4 className="font-semibold text-sm text-red-800">Connection Failed</h4>
            <p className="text-xs text-red-600">{message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-xl">🐘</span>
        </div>
        <div>
          <h4 className="font-semibold text-sm">Connect Neon Database</h4>
          <p className="text-xs text-slate-500">Query your PostgreSQL database with AI</p>
        </div>
      </div>
      
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className={`w-full py-2 px-4 rounded font-medium text-sm transition-colors
          ${isConnecting 
            ? 'bg-slate-200 text-slate-500 cursor-wait' 
            : 'bg-green-600 text-white hover:bg-green-700'
          }
        `}
      >
        {isConnecting ? 'Connecting...' : 'Connect with Neon'}
      </button>
      
      <p className="text-xs text-slate-400 mt-2 text-center">
        Secure OAuth connection • Read-only access
      </p>
    </div>
  );
}
