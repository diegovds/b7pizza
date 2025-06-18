'use client'

import { Product } from '@/generated/prisma'
import { decimalToMoney } from '@/lib/utils'

type Props = {
  quantity: number
  price: number
  product: Product
}

export const OrderPizza = ({ product, price, quantity }: Props) => {
  return (
    <div>
      <div className="text-base font-bold">{product.name}</div>
      <div>
        {decimalToMoney(price)} X {quantity}
      </div>
    </div>
  )
}
