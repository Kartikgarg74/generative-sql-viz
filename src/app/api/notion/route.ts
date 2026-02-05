import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { title, content, databaseId } = await request.json();
    
    // TODO: Implement Notion API
    return NextResponse.json({
      status: 'Notion integration pending',
      title,
      pageUrl: '#'
    });
    
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
