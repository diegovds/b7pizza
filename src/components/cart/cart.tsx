'use client'

import { useCart } from '@/stores/cart'
import { useEffect, useState } from 'react'
import { Drawer, DrawerContent, DrawerTitle } from '../ui/drawer'
import { CartEmpty } from './cart-empty'
import { CartList } from './cart-list'

export const Cart = () => {
  const cart = useCart()
  const [open, setOpen] = useState(cart.open)

  useEffect(() => setOpen(cart.open), [cart])

  return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={(open) => cart.setOpen(open)}
    >
      <DrawerContent className="border-l-0 bg-slate-900 p-4">
        <DrawerTitle className="text-stone-100">Carrinho</DrawerTitle>
        {cart.items.length <= 0 && <CartEmpty />}
        {cart.items.length > 0 && <CartList />}
      </DrawerContent>
    </Drawer>
  )
}
