import { PrismaClient } from "@prisma/client";
import { CreateStore } from "../services/store/create-service";

const prisma = new PrismaClient()

export const createStore = async (request: CreateStore) => {
  try {
    await prisma.store.create({
      data: request
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