import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) return NextResponse.json({ exists: false })

  const has = await hasEmail(email)
}
