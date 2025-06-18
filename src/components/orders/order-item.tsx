import { decimalToMoney } from '@/lib/utils'
import { Order } from '@/types/order'
import { OrderPizza } from './order-pizza'

type Props = {
  order: Order
}

export const OrderItem = ({ order }: Props) => {
  return (
    <div className="bg-secondary rounded-md p-4 text-sm">
      <div className="text-lg font-bold">Pedido nº{order.id}</div>
      <div className="text-lg font-bold">Itens:</div>
      {order.orderProducts.map((product) => (
        <OrderPizza
          key={product.id}
          product={product.product}
          price={product.price}
          quantity={product.quantity}
        />
      ))}
      <div className="text-base font-bold">Entrega R$ 10,00</div>
      <div className="text-base font-bold">Total:</div>
      <div className="flex justify-center gap-2">
        <div className="">{decimalToMoney(order.subtotal)}</div>
        <div>-</div>
        {order.status === 'PAID' && <div className="font-bold">Pago</div>}
      </div>
    </div>
  )
}
