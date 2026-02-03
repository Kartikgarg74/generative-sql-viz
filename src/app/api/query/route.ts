import { executeQuery } from '@/db/connection';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    if (!query.trim().toLowerCase().startsWith('select')) {
      return NextResponse.json({ error: 'Only SELECT queries allowed' }, { status: 400 });
    }
    
    const { results, columns } = executeQuery(query);
    return NextResponse.json({ results, columns, rowCount: results.length });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
