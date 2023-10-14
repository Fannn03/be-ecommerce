import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const insertDocument = async (userId: string) => {
  try {
    return await prisma.document.create({
      data: {
        user_id: userId
      }
    })
  } catch (err) {
    throw err
  }
}