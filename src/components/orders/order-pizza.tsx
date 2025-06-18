import { Product } from '@/generated/prisma'
import { decimalToMoney } from '@/lib/utils'
import Image from 'next/image'

type Props = {
  quantity: number
  price: number
  product: Product
}

export const OrderPizza = ({ product, price, quantity }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="w-20">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/pizzas/${product.image}`}
          alt={product.name}
          width={300}
          height={300}
          className="w-full"
        />
      </div>
      <div className="flex flex-col items-end">
        <div className="font-bold">{product.name}</div>
        <div className="text-sm">
          {decimalToMoney(price)} X {quantity}
        </div>
      </div>
    </div>
  )
}
