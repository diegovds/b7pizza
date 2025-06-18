import { Product } from '@/generated/prisma'

export type Order = {
  id: number
  subtotal: number
  status: string
  orderProducts: Product[]
}
