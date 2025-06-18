import { getLoggedUser } from '@/services/auth'
import { getOrdersByUserId } from '@/services/order'
import { NextResponse } from 'next/server'

export async function GET() {
  const loggedUser = await getLoggedUser()

  if (!loggedUser) {
    return NextResponse.json({ error: 'Usuário não logado.' }, { status: 400 })
  }

  const orders = await getOrdersByUserId(loggedUser.id)
  if (!orders)
    return NextResponse.json(
      { error: 'Ocorreu um erro ao buscar pedios.' },
      { status: 400 },
    )

  return NextResponse.json({ orders })
}
