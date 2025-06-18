import { Product } from '@/generated/prisma'

type OrderProduct = {
  id: number
  quantity: number
  price: number
  product: Product
}

export type Order = {
  id: number
  subtotal: number
  status: string
  orderProducts: OrderProduct[]
}
