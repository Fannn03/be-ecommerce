import { PrismaClient } from "@prisma/client";
import { createCartInterface, updateCartInterface } from "@domain/models/interfaces/cart.interface";

const prisma = new PrismaClient();

export const findCart = async (cartId: string) => {
  return await prisma.productCart.findFirst({
    where: {
      id: cartId,
      deletedAt: null
    }
  })
}

export const findAllCart = async (userId: string, take: number, skip: number) => {
  return await prisma.$transaction([
    prisma.productCart.count({
      where: {
        user_id: userId,
        is_checkout: false,
        deletedAt: null
      }
    }),
    prisma.productCart.findMany({
      where: {
        user_id: userId,
        is_checkout: false,
        deletedAt: null
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
    throw err;
  }
}

export const updateCart = async (userId: string, body: updateCartInterface) => {
  try {
    return await prisma.productCart.update({
      data: {
        quantity: body.quantity
      },
      where: {
        id: body.id,
        user_id: userId,
        deletedAt: null
      },
      include: {
        product: true
      }
    })
  } catch (err) {
    throw err;
  }
}

export const deleteCart = async (userId: string, cartId: string) => {
  try {
    return await prisma.productCart.update({
      data: {
        deletedAt: new Date().toISOString()
      },
      where: {
        id: cartId,
        user_id: userId
      }
    })
  } catch (err) {
    throw err;
  }
}