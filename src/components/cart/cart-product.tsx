'use client'

import { decimalToMoney } from '@/lib/utils'
import { useCart } from '@/stores/cart'
import { useProducts } from '@/stores/products'
import { CartItem } from '@/types/cart-item'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../ui/button'

type Props = {
  data: CartItem
}

export const CartProduct = ({ data }: Props) => {
  const [qt, setQt] = useState(data.quantity)

  const cart = useCart()
  const products = useProducts()
  const product = products.products.find((item) => item.id === data.productId)
  if (!product) return null

  const handleMinusClick = () => {
    if (qt - 1 <= 0) {
      cart.removeItem(data.productId)
    } else {
      cart.addItem({ productId: data.productId, quantity: -1 })
      setQt(qt - 1)
    }
  }

  const handlePlusClick = () => {
    cart.addItem({ productId: data.productId, quantity: 1 })
    setQt(qt + 1)
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-10">
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
          className="w-full"
        />
      </div>
      <div className="flex-1">
        <div>{product.name}</div>
        <div className="text-sm">{decimalToMoney(product.price)}</div>
      </div>
      <div className="bg-secondary flex items-center gap-3 rounded-md p-2">
        <Button size="sm" variant="ghost" onClick={handleMinusClick}>
          -
        </Button>
        <div>{qt}</div>
        <Button size="sm" variant="ghost" onClick={handlePlusClick}>
          +
        </Button>
      </div>
    </div>
  )
}
