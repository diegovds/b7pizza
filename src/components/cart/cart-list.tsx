'use client'

import { decimalToMoney } from '@/lib/utils'
import { useAuth } from '@/stores/auth'
import { useCart } from '@/stores/cart'
import { useProducts } from '@/stores/products'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { CartProduct } from './cart-product'

export const CartList = () => {
  const auth = useAuth()
  const cart = useCart()
  const products = useProducts()

  const [subtotal, setSubtotal] = useState(0)
  const shippingCost = 10

  const calculateSubtotal = () => {
    let sub = 0
    for (const item of cart.items) {
      const prod = products.products.find(
        (pitem) => pitem.id === item.productId,
      )
      if (prod) sub += item.quantity * parseFloat(prod.price.toString())
    }
    setSubtotal(sub)
  }

  useEffect(calculateSubtotal, [cart, products])

  return (
    <>
      <div className="my-5 flex flex-col gap-3">
        {cart.items.map((item) => (
          <CartProduct key={item.productId} data={item} />
        ))}
      </div>
      <div className="my-4 text-right">
        <div>Sub-total: {decimalToMoney(subtotal)}</div>
        <div>Frete: {decimalToMoney(shippingCost)}</div>
        <div className="font-bold">
          Total: {decimalToMoney(subtotal + shippingCost)}
        </div>
      </div>

      {auth.token ? (
        <Button className="bg-green-700 hover:bg-green-900">
          Finalizar Compra
        </Button>
      ) : (
        <Button onClick={() => auth.setOpen(true)}>Login/Cadastro</Button>
      )}
    </>
  )
}
