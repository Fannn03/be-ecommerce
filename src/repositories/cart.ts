import { PrismaClient } from "@prisma/client"

interface createCartInterface {
  user_id     : string,
  product_id  : number,
  quantity    : number
}

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

export const createCart = async (query: createCartInterface) => {
  try {
    return await prisma.productCart.create({
      data: {
        user_id: query.user_id,
        product_id: query.product_id,
        quantity: query.quantity
      }
    })
  } catch (err) {
    throw err
  }
}