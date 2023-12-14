import { PrismaClient } from "@prisma/client";
import { createStoreInterface, findStoreInterface } from "@domain/interfaces/store.interface";

const prisma = new PrismaClient();

export const findStore = async (params: findStoreInterface) => {
  return prisma.store.findFirst({
    where: {
      OR: [
        {id: params.id},
        {user_id: params.user_id},
        {name: params.name},
        {username: params.username}
      ],
      AND: [
        { deletedAt: null }
      ]
    }
  })
}

export const createStore = async (body: createStoreInterface) => {
  try {
    return await prisma.store.create({
      data: body,
      include: {
        user: true
      }
    })
  } catch (err) {
    throw err
  }
}

// TODO: change params any interface
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