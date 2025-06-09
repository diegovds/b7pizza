import { getLoggedUser } from '@/services/auth'
import { NextResponse } from 'next/server'
import z from 'zod'

export async function POST(request: Request) {
  const bodySchema = z.object({
    cart: z.array(
      z.object({
        productId: z.number(),
        quantity: z.number(),
      }),
    ),
  })

  const body = await request.json()

  const result = bodySchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  const { cart } = result.data
  const loggedUser = await getLoggedUser()

  console.log('LOGADO:', loggedUser)

  return NextResponse.json({ cart })
}
