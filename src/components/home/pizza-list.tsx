'use client'

import { Product } from '@/generated/prisma'
import { useProducts } from '@/stores/products'
import { useEffect, useState } from 'react'
import { PizzaItem } from './pizza-item'

type Props = {
  pizzas: Product[]
}

export const PizzaList = ({ pizzas }: Props) => {
  const [isInitialRender, setIsInitialRender] = useState(true)
  const products = useProducts()

  useEffect(() => {
    if (isInitialRender) {
      products.setProducts(pizzas)
      setIsInitialRender(false)
    }
  }, [isInitialRender, products, pizzas])

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {pizzas.map((item: Product) => (
        <PizzaItem key={item.id} data={item} />
      ))}
    </div>
  )
}
