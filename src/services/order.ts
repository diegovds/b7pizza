import { prisma } from '@/lib/prisma'
import { CartItem } from '@/types/cart-item'

export const createNewOrder = async (userId: number, cart: CartItem[]) => {
  const shippingCost = 10
  const orderProducts = []
  let subtotal = shippingCost

  for (const item of cart) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    })
    if (product) {
      orderProducts.push({
        productId: product.id,
        price: parseFloat(product.price.toString()),
        quantity: item.quantity,
      })
      subtotal += item.quantity * parseFloat(product.price.toString())
    }
  }

  const newOrder = await prisma.order.create({
    data: {
      userId,
      subtotal,
      orderProducts: {
        createMany: {
          data: orderProducts,
        },
      },
    },
    include: {
      orderProducts: {
        select: {
          quantity: true,
          product: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      },
    },
  })

  return newOrder
}

export const getOrdersByUserId = async (userId: number) => {
  const orders = await prisma.order.findMany({
    where: { userId },
    select: {
      id: true,
      subtotal: true,
      status: true,
      orderProducts: {
        select: {
          id: true,
          quantity: true,
          price: true,
          product: true,
        },
      },
    },
  })

  return orders
}
