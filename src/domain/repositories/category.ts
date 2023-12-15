import { PrismaClient } from "@prisma/client";
import { createCategoryInterface, findCategoryInterface } from "@domain/models/interfaces/category.interface";

const prisma = new PrismaClient();

export const findCategory = async (params: findCategoryInterface) => {
  return await prisma.category.findFirst({
    where: {
      OR: [
        {id: params.id},
        {name: params.name}
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

export const createCategory = async (body: createCategoryInterface) => {
  try {
    return await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
        photos: body.photos
      }
    })
  } catch (err) {
    throw err
  }
}