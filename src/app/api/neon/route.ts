import { NextResponse } from 'next/server';
import { Client } from '@neondatabase/serverless';

export async function POST(request: Request) {
  let client: Client | null = null;
  
  try {
    const body = await request.json();
    const { connectionString, query, action = 'query' } = body;
    
    console.log('Neon API called:', { action, hasQuery: !!query });
    
    // Security check
    if (!connectionString || typeof connectionString !== 'string') {
      return NextResponse.json(
        { error: 'Connection string is required' }, 
        { status: 400 }
      );
    }
    
    if (!connectionString.includes('neon.tech')) {
      return NextResponse.json(
        { error: 'Only Neon (neon.tech) databases supported' }, 
        { status: 400 }
      );
    }
    
    // Create client with timeout
    client = new Client(connectionString);
    
    // Set connection timeout
    const connectPromise = client.connect();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Connection timeout after 10s')), 10000);
    });
    
    await Promise.race([connectPromise, timeoutPromise]);
    console.log('Connected to Neon successfully');
    
    let result;
    
    if (action === 'tables') {
      // List tables
      result = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      `);
      
      await client.end();
      
      return NextResponse.json({
        success: true,
        connected: true,
        database: 'neon',
        tables: result.rows.map((r: any) => r.table_name),
        rowCount: result.rowCount,
      });
      
    } else {
      // Execute query
      if (!query) {
        return NextResponse.json(
          { error: 'Query is required for query action' },
          { status: 400 }
        );
      }
      
      if (!query.trim().toLowerCase().startsWith('select')) {
        return NextResponse.json(
          { error: 'Only SELECT queries allowed in demo' },
          { status: 400 }
        );
      }
      
      result = await client.query(query);
      await client.end();
      
      return NextResponse.json({
        success: true,
        connected: true,
        database: 'neon',
        results: result.rows,
        columns: result.fields.map((f: any) => f.name),
        rowCount: result.rowCount,
      });
    }
    
  } catch (error: any) {
    console.error('Neon error:', error);
    
    // Clean up connection
    if (client) {
      try { await client.end(); } catch (e) {}
    }
    
    return NextResponse.json(
      { 
        success: false,
        connected: false,
        error: error.message || 'Database connection failed'
      }, 
      { status: 500 }
    );
  }
}
