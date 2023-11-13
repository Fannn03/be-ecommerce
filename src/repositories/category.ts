import { PrismaClient } from "@prisma/client"

interface categoryInterface {
  name: string
}

const prisma = new PrismaClient()

export const createCategory = async (category: categoryInterface) => {
  try {
    return await prisma.category.create({
      data: {
        name: category.name
      }
    })
  } catch (err) {
    throw err
  }
}