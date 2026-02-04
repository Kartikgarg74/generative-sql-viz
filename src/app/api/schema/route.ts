import { getDatabaseSchema, getRowCounts } from '@/db/connection';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const schemaText = getDatabaseSchema();
    const tables = parseSchema(schemaText);
    
    return NextResponse.json({ 
      schema: schemaText,
      tables: tables // Return directly as 'tables' for easier access
    });
  } catch (error) {
    return NextResponse.json({ 
      error: String(error),
      tables: [] // Return empty array on error
    }, { status: 500 });
  }
}

function parseSchema(schemaText: string): any[] {
  const tables: any[] = [];
  const lines = schemaText.split('\n');
  
  let currentTable: any = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('Table:')) {
      if (currentTable) {
        tables.push(currentTable);
      }
      currentTable = {
        name: trimmed.replace('Table:', '').trim(),
        columns: [],
        rowCount: 0
      };
    }
    else if (trimmed.startsWith('-') && currentTable) {
      const match = trimmed.match(/- (\w+) \((\w+)\)/);
      if (match) {
        const [, name, type] = match;
        currentTable.columns.push({
          name,
          type,
          isPrimaryKey: name === 'id',
          isForeignKey: false
        });
      }
    }
  }
  
  if (currentTable) {
    tables.push(currentTable);
  }
  
  // Get row counts
  for (const table of tables) {
    try {
      table.rowCount = getRowCounts(table.name);
    } catch (e) {
      table.rowCount = 0;
    }
  }
  
  return tables;
}
