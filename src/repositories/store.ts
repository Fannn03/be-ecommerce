import { PrismaClient } from "@prisma/client";

interface StoreInterface {
  user_id: string,
  username: string,
  name: string,
  photos?: string,
  description?: string
}

const prisma = new PrismaClient()

export const createStore = async (request: StoreInterface) => {
  try {
    return await prisma.store.create({
      data: request,
      include: {
        user: true
      }
    })
  } catch (err) {
    throw err
  }
}

export const updateStore = async (request: any) => {
  try {
    return await prisma.store.update({
      data: request,
      where: {
        user_id: request.user_id
      }
    })
  } catch (err) {
    throw err
  }
}