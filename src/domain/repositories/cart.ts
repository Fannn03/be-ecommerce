import { PrismaClient } from "@prisma/client"
import { createCartInterface } from "@domain/interfaces/cart.interface";

const prisma = new PrismaClient();

export const findAllCart = async (userId: string, take: number, skip: number) => {
  return await prisma.$transaction([
    prisma.productCart.count({
      where: {
        user_id: userId,
        is_checkout: false
      }
    }),
    prisma.productCart.findMany({
      where: {
        user_id: userId,
        is_checkout: false
      },
      include: {
        product: true,
      },
      take: take,
      skip: skip
    })
  ])
}

export const createCart = async (body: createCartInterface) => {
  try {
    return await prisma.productCart.create({
      data: {
        user_id: body.user_id,
        product_id: body.product_id,
        quantity: body.quantity
      }
    })
  } catch (err) {
    throw err
  }
}