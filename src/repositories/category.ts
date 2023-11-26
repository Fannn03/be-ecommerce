import { PrismaClient } from "@prisma/client"

interface categoryInterface {
  name: string
  slug: string
}

interface findCategory {
  id?: number,
  name?: string,
}

const prisma = new PrismaClient()

export const findCategory = async (category: findCategory) => {
  return await prisma.category.findFirst({
    where: {
      OR: [
        {id: category.id},
        {name: category.name}
      ],
      deletedAt: null
    }
  })
}

export const findAllCategory = async () => {
  return await prisma.category.findMany({
    where: {
      deletedAt: null
    }
  })
}

export const createCategory = async (category: categoryInterface) => {
  try {
    return await prisma.category.create({
      data: {
        name: category.name,
        slug: category.slug
      }
    })
  } catch (err) {
    throw err
  }
}