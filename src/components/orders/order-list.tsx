import { Order } from '@/types/order'
import { OrderItem } from './order-item'

type Props = {
  orders: Order[]
}

export const OrderList = async ({ orders }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  )
}
