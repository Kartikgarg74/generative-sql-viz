import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'Neon API is accessible',
    timestamp: new Date().toISOString()
  });
}
