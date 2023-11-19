import { PrismaClient } from "@prisma/client"

interface productInterface {
  store_id: number,
  categpry_id   : number,
  name          : string,
  slug          : string,
  description   : string,
  price         : number,
  stock         : number
}

interface photosInterface {
  name: string
}

const prisma = new PrismaClient()

export const findAllProduct = async (take: number, skip: number) => {
  try {
    return await prisma.product.findMany({
      where: {
        deletedAt: null
      },
      include: {
        images: true
      },
      take: take,
      skip: skip
    })
  } catch (err) {
    throw err
  }
}

export const createProduct = async (product: productInterface, photos: photosInterface[]) => {
  try {
    return prisma.product.create({
      data: {
        store_id: product.store_id,
        category_id: product.categpry_id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        stock: product.stock,
        images: {
          create: photos
        }
      }
    })
  } catch (err) {
    throw err
  }
}