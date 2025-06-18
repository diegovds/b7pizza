'use client'

import { Order } from '@/types/order'
import { Button } from '../ui/button'

type Props = {
  order: Order
}

export const OrderItem = ({ order }: Props) => {
  const handleAddToCart = () => {}

  return (
    <div className="bg-secondary rounded-md p-4 text-sm">
      <div className="text-lg font-bold">{order.id}</div>
      <div className="text-center">
        <Button onClick={handleAddToCart}>Detalhes do pedido</Button>
      </div>
    </div>
  )
}
