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

interface Column {
  name: string;
  type: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
}

interface Table {
  name: string;
  columns: Column[];
  rowCount: number;
}

function parseSchema(schemaText: string): Table[] {
  const tables: Table[] = [];
  let currentTable: Table | null = null;
  
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
    } catch {
      // Could not get row counts, default to 0
      table.rowCount = 0;
    }
  }
  
  return tables;
}
