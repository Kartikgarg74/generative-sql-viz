import { NextResponse } from 'next/server';
import { Client } from '@neondatabase/serverless';

export async function POST(request: Request) {
  try {
    const { connectionString, query, action = 'query' } = await request.json();
    
    // Security: Only allow Neon connections
    if (!connectionString.includes('neon.tech')) {
      return NextResponse.json(
        { error: 'Only Neon (neon.tech) databases are supported for security' }, 
        { status: 400 }
      );
    }
    
    // Validate query - only SELECT allowed for demo safety
    if (action === 'query' && !query.trim().toLowerCase().startsWith('select')) {
      return NextResponse.json(
        { error: 'Only SELECT queries are allowed in demo mode' },
        { status: 400 }
      );
    }
    
    const client = new Client(connectionString);
    await client.connect();
    
    let result;
    
    if (action === 'tables') {
      // Get list of tables
      result = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `);
    } else if (action === 'schema') {
      // Get schema for specific table
      const { table } = await request.json();
      result = await client.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = $1
      `, [table]);
    } else {
      // Execute query
      result = await client.query(query);
    }
    
    await client.end();
    
    return NextResponse.json({
      success: true,
      results: result.rows,
      columns: result.fields.map(f => f.name),
      rowCount: result.rowCount,
      database: 'neon',
    });
    
  } catch (error: any) {
    console.error('Neon DB error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to connect to Neon database'
      }, 
      { status: 500 }
    );
  }
}
