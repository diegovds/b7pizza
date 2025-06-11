import { getLoggedUser } from '@/services/auth'
import { createNewOrder } from '@/services/order'
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

  if (!loggedUser) {
    return NextResponse.json({ error: 'Usuário não logado.' }, { status: 400 })
  }

  const order = await createNewOrder(loggedUser.id, cart)
  if (!order)
    return NextResponse.json(
      { error: 'Ocorreu um erro ao criar o pedido.' },
      { status: 400 },
    )

  // método de pagamento

  return NextResponse.json({ order }, { status: 201 })
}
