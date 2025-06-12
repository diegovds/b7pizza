import { stripe } from '@/lib/stripe'
import { getLoggedUser } from '@/services/auth'
import { createNewOrder } from '@/services/order'
import { headers } from 'next/headers'
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
  const headersList = await headers()
  const origin = headersList.get('origin')

  if (!loggedUser) {
    return NextResponse.json({ error: 'Usuário não logado.' }, { status: 400 })
  }

  const order = await createNewOrder(loggedUser.id, cart)
  if (!order)
    return NextResponse.json(
      { error: 'Ocorreu um erro ao criar o pedido.' },
      { status: 400 },
    )

  const paymentItems = []
  for (const item of order.orderProducts) {
    paymentItems.push({
      price_data: {
        currency: 'BRL',
        unit_amount: parseFloat(item.product.price.toString()) * 100,
        product_data: {
          name: item.product.name,
        },
      },
      quantity: item.quantity,
    })
  }

  // método de pagamento
  const paymentSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}`,
    line_items: paymentItems,
    customer_email: loggedUser.email,
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          display_name: 'Frete padrão',
          fixed_amount: {
            currency: 'BRL',
            amount: 1000,
          },
        },
      },
    ],
    metadata: {
      order_id: order.id,
    },
  })

  return NextResponse.json({ order, url: paymentSession.url }, { status: 201 })
}
