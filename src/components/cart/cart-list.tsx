'use client'

import { apiWithAuth } from '@/lib/axios'
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
  const [disabledButton, setDisabledButton] = useState(false)
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

  const handleFinish = async () => {
    if (cart.items.length > 0) {
      setDisabledButton(true)
      const orderReq = await apiWithAuth.post('/order/new', {
        cart: cart.items,
      })
      if (orderReq.status === 201) {
        window.location.href = orderReq.data.url
      }
      setDisabledButton(false)
    }
  }

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
        <Button
          onClick={handleFinish}
          className="bg-green-700 hover:bg-green-900"
          disabled={disabledButton}
        >
          Finalizar Compra
        </Button>
      ) : (
        <Button onClick={() => auth.setOpen(true)}>Login/Cadastro</Button>
      )}
    </>
  )
}
