import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

interface createCartInterface {
  user_id     : string,
  product_id  : number,
  quantity    : number
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