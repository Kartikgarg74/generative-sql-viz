import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'src/db', 'data.db');

interface QueryResult {
  results: Record<string, unknown>[];
  columns: string[];
}

export function initDatabase(): void {
  const db = new Database(DB_PATH);
  const schema = fs.readFileSync(path.join(process.cwd(), 'src/db/schema.sql'), 'utf8');
  db.exec(schema);
  console.log('Database initialized!');
  db.close();
}

export function executeQuery(query: string): QueryResult {
  const db = new Database(DB_PATH);
  try {
    const stmt = db.prepare(query);
    const results = stmt.all() as Record<string, unknown>[];
    const columns = results.length > 0 ? Object.keys(results[0]) : [];
    return { results, columns };
  } finally {
    db.close();
  }
}

interface TableInfo {
  name: string;
}

interface ColumnInfo {
  name: string;
  type: string;
}

export function getDatabaseSchema(): string {
  const db = new Database(DB_PATH);
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all() as TableInfo[];
  let schema = '';
  for (const table of tables) {
    const columns = db.prepare(`PRAGMA table_info(${table.name})`).all() as ColumnInfo[];
    schema += `Table: ${table.name}\n`;
    schema += columns.map((col) => `  - ${col.name} (${col.type})`).join('\n');
    schema += '\n\n';
  }
  db.close();
  return schema;
}

export function getRowCounts(tableName: string): number {
  const db = new Database(DB_PATH);
  try {
    const result = db.prepare(`SELECT COUNT(*) as count FROM ${tableName}`).get() as { count: number };
    return result?.count || 0;
  } finally {
    db.close();
  }
}
