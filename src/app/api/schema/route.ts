import { getDatabaseSchema } from '@/db/connection';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const schema = getDatabaseSchema();
    return NextResponse.json({ schema });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
