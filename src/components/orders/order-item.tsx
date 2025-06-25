import { decimalToMoney } from '@/lib/utils'
import { Order } from '@/types/order'
import { OrderPizza } from './order-pizza'

type Props = {
  order: Order
}

export const OrderItem = ({ order }: Props) => {
  return (
    <div className="flex flex-col gap-2 rounded-md bg-slate-800 p-4 text-sm text-stone-100">
      <div className="text-lg font-bold">Pedido nº{order.id}</div>
      <div className="text-lg font-bold">Itens:</div>
      <div className="flex flex-col gap-2">
        {order.orderProducts.map((product) => (
          <OrderPizza
            key={product.id}
            product={product.product}
            price={product.price}
            quantity={product.quantity}
          />
        ))}
      </div>
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
