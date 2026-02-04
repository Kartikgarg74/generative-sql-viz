import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    // TODO: Implement Brave search
    return NextResponse.json({
      results: [{ title: 'Brave search pending', url: '#' }],
      query
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
