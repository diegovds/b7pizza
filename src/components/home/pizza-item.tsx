'use client'

import { Product } from '@/generated/prisma'
import { decimalToMoney } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '../ui/button'

type Props = {
  data: Product
}

export const PizzaItem = ({ data }: Props) => {
  const handleAddToCart = () => {}

  return (
    <div className="bg-secondary rounded-md p-4 text-sm">
      <Image
        src={data.image}
        alt={data.name}
        width={200}
        height={200}
        className="mb-3 w-full"
      />
      <div className="text-lg font-bold">{data.name}</div>
      <div>{decimalToMoney(data.price)}</div>
      <div className="mb-3 truncate">{data.ingredients}</div>
      <div className="text-center">
        <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>
      </div>
    </div>
  )
}
