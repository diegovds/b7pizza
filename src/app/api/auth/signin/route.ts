import { createUserToken, validateAuth } from '@/services/auth'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: Request) {
  const bodySchema = z.object({
    email: z.string().email({ message: 'email não válido' }),
    password: z
      .string()
      .min(6, { message: 'a senha deve ter pelo menos 6 caracteres' }),
  })

  const body = await request.json()

  const result = bodySchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  const { email, password } = result.data

  const user = await validateAuth(email, password)
  if (!user) return NextResponse.json({ error: 'Acesso negado' })

  const token = await createUserToken(user.id)

  return NextResponse.json({ user, token })
}
