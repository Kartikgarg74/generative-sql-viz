"use client";

import { z } from 'zod';
import { useState } from 'react';

export const erDiagramSchema = z.object({
  tables: z.array(z.object({
    name: z.string(),
    columns: z.array(z.object({
      name: z.string(),
      type: z.string(),
      isPrimaryKey: z.boolean().optional(),
      isForeignKey: z.boolean().optional(),
      references: z.string().optional(), // "table.column"
    })),
  })).describe('Tables with columns and key information'),
  relationships: z.array(z.object({
    from: z.string().describe('Source table'),
    to: z.string().describe('Target table'),
    fromColumn: z.string(),
    toColumn: z.string(),
    type: z.enum(['one-to-one', 'one-to-many', 'many-to-many']),
  })).optional().describe('Relationships between tables'),
});

export function ERDiagram({ tables, relationships }: any) {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  
  if (!tables || tables.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-2">📊 ER Diagram</h3>
        <p className="text-slate-500">No tables to display.</p>
      </div>
    );
  }

  // Calculate positions for tables (simple grid layout)
  const positions = calculatePositions(tables);
  
  // Get relationships for a table
  const getTableRelations = (tableName: string) => {
    return relationships?.filter(
      (r: any) => r.from === tableName || r.to === tableName
    ) || [];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          📊 Entity-Relationship Diagram
          <span className="text-sm font-normal text-slate-500">
            ({tables.length} entities)
          </span>
        </h3>
        {relationships && relationships.length > 0 && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {relationships.length} relationships
          </span>
        )}
      </div>

      {/* Diagram Container */}
      <div className="relative bg-slate-50 rounded-lg p-4 overflow-auto min-h-[300px]">
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {/* Draw relationship lines */}
          {relationships?.map((rel: any, idx: number) => {
            const fromPos = positions[rel.from];
            const toPos = positions[rel.to];
            if (!fromPos || !toPos) return null;
            
            return (
              <g key={`rel-${idx}`}>
                <line
                  x1={fromPos.x + 100}
                  y1={fromPos.y + 50}
                  x2={toPos.x + 100}
                  y2={toPos.y + 50}
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray={rel.type === 'many-to-many' ? '5,5' : '0'}
                />
                {/* Cardinality labels */}
                <text
                  x={(fromPos.x + toPos.x) / 2 + 100}
                  y={(fromPos.y + toPos.y) / 2 + 45}
                  className="text-xs fill-slate-500"
                  textAnchor="middle"
                >
                  {rel.type === 'one-to-many' ? '1:N' : 
                   rel.type === 'many-to-many' ? 'N:M' : '1:1'}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Table Boxes */}
        <div className="relative" style={{ zIndex: 1 }}>
          {tables.map((table: any, idx: number) => {
            const pos = positions[table.name] || { x: 0, y: 0 };
            const isSelected = selectedTable === table.name;
            const tableRels = getTableRelations(table.name);
            
            return (
              <div
                key={`er-table-${table.name}-${idx}`}
                className={`absolute bg-white rounded-lg shadow-md border-2 transition-all cursor-pointer
                  ${isSelected ? 'border-blue-500 shadow-lg' : 'border-slate-300 hover:border-blue-300'}
                  ${tableRels.length > 0 ? 'ring-2 ring-blue-100' : ''}
                `}
                style={{
                  left: pos.x,
                  top: pos.y,
                  width: '200px',
                }}
                onClick={() => setSelectedTable(isSelected ? null : table.name)}
              >
                {/* Table Header */}
                <div className={`px-3 py-2 rounded-t-lg font-semibold text-sm
                  ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-800'}
                `}>
                  <div className="flex justify-between items-center">
                    <span>{table.name}</span>
                    {tableRels.length > 0 && (
                      <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded">
                        {tableRels.length} rel
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Columns */}
                <div className="p-2 space-y-1">
                  {table.columns?.slice(0, 5).map((col: any, cidx: number) => (
                    <div 
                      key={`er-col-${col.name}-${cidx}`}
                      className="flex items-center gap-2 text-xs"
                    >
                      {col.isPrimaryKey && (
                        <span className="text-yellow-600 font-bold">🔑</span>
                      )}
                      {col.isForeignKey && (
                        <span className="text-blue-600">🔗</span>
                      )}
                      {!col.isPrimaryKey && !col.isForeignKey && (
                        <span className="w-4" />
                      )}
                      <span className={`font-mono ${col.isPrimaryKey ? 'font-semibold' : 'text-slate-600'}`}>
                        {col.name}
                      </span>
                      <span className="text-slate-400 text-[10px] ml-auto">
                        {col.type}
                      </span>
                    </div>
                  ))}
                  {table.columns?.length > 5 && (
                    <div className="text-xs text-slate-400 text-center pt-1">
                      +{table.columns.length - 5} more columns
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Relationship Legend */}
      {relationships && relationships.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1">
            <span className="w-8 h-0.5 bg-slate-400" />
            <span>One-to-One (1:1)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-8 h-0.5 bg-slate-400" />
            <span>One-to-Many (1:N)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-8 h-0.5 bg-slate-400 border-dashed" style={{borderTop: '2px dashed #94a3b8', height: 0}} />
            <span>Many-to-Many (N:M)</span>
          </div>
        </div>
      )}

      {/* Selected Table Details */}
      {selectedTable && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-sm text-blue-900 mb-2">
            {selectedTable} Details
          </h4>
          <div className="text-xs text-blue-800">
            {getTableRelations(selectedTable).map((rel: any, idx: number) => (
              <div key={idx} className="mb-1">
                {rel.from === selectedTable ? '→' : '←'} {rel.to === selectedTable ? rel.from : rel.to}
                {' '}
                <span className="text-blue-600">({rel.type})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Simple layout algorithm - arrange tables in a grid
function calculatePositions(tables: any[]): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};
  const cols = 3;
  const spacingX = 240;
  const spacingY = 180;
  
  tables.forEach((table, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    positions[table.name] = {
      x: col * spacingX + 20,
      y: row * spacingY + 20,
    };
  });
  
  return positions;
}
