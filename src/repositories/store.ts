import { PrismaClient } from "@prisma/client";

interface StoreInterface {
  user_id       : string,
  username      : string,
  name          : string,
  photos?       : string,
  description?  : string
}

interface findStore {
  id?: number,
  user_id?: string,
  name?: string
}

const prisma = new PrismaClient()

export const findStore = async (query: findStore) => {
  return prisma.store.findFirst({
    where: {
      OR: [
        {id: query.id},
        {user_id: query.user_id},
        {name: query.name}
      ]
    }
  })
}

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
      },
      include: {
        user: true
      }
    })
  } catch (err) {
    throw err
  }
}