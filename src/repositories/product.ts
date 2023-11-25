import { PrismaClient } from "@prisma/client"
import { categoriesQuery } from "../services/product/findall-service"

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

export const findAllProduct = async (take: number, skip: number, categories: categoriesQuery) => {
  try {
    return await prisma.product.findMany({
      where: {
        deletedAt: null,
        AND: {
          category: categories,
          store: {
            deletedAt: null
          }
        }
      },
      orderBy: [
        {createdAt: 'desc'}
      ],
      include: {
        store: true,
        images: true,
        category: true
      },
      take: take,
      skip: skip
    })
  } catch (err) {
    throw err
  }
}

export const findProduct = async (query: any) => {
  try {
    return await prisma.product.findFirst({
      where: {
        OR: [
          {id: query.id},
          {slug: query.slug},
          {name: query.name}
        ],
        deletedAt: null,
        store: {
          deletedAt: null
        }
      },
      include: {
        store: true,
        images: true
      }
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
      },
      include: {
        images: true
      }
    })
  } catch (err) {
    throw err
  }
}