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

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
