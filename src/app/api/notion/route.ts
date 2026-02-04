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
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
