import { createUser, createUserToken, hasEmail } from '@/services/auth'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: Request) {
  const bodySchema = z.object({
    name: z
      .string()
      .min(2, { message: 'o nome deve ter pelo menos 2 caracteres' }),
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

  const { name, email, password } = result.data

  const has = await hasEmail(email)
  if (has) return NextResponse.json({ error: 'E-mail já existe' })

  const newUser = await createUser(name, email, password)
  if (!newUser) return NextResponse.json({ error: 'Erro ao criar usuário' })

  const token = await createUserToken(newUser.id)

  return NextResponse.json({ user: newUser, token }, { status: 201 })
}
