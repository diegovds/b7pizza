import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ API: 'B7 Pizza' })
}
