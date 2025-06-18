import { Header } from '@/components/layout/header'
import { OrderList } from '@/components/orders/order-list'
import { Order } from '@/types/order'
import axios from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (!token) return redirect('/')

  const response = await axios.get<Order[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pizzas/orders`,
    {
      headers: {
        Authorization: `Token ${token.value}`,
      },
    },
  )

  return (
    <div>
      <Header />
      <main className="container mx-auto mb-10 text-center">
        <h1 className="text-2xl">Seus pedidos:</h1>
        <OrderList orders={response.data} />
      </main>
    </div>
  )
}
