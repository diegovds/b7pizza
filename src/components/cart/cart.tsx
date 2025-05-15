'use client'

import { useCart } from '@/stores/cart'
import { useEffect, useState } from 'react'
import { Drawer, DrawerContent, DrawerTitle } from '../ui/drawer'

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
      <DrawerContent>
        <DrawerTitle>Carrinho</DrawerTitle>
        ...
      </DrawerContent>
    </Drawer>
  )
}
