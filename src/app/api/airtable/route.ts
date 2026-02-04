import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { data, destination } = await request.json();
    
    // TODO: Implement Airtable/Sheets export
    return NextResponse.json({
      status: 'Export pending',
      rows: data?.length || 0,
      destination
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
