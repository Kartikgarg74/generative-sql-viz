import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    // TODO: Implement Brave search
    return NextResponse.json({
      results: [{ title: 'Brave search pending', url: '#' }],
      query
    });
    
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
