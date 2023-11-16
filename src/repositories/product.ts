import { PrismaClient } from "@prisma/client"

interface productInterface {
  store_id: number,
  categpry_id: number,
  name: string,
  slug: string,
  description: string,
  price: number,
  stock: number
}

const prisma = new PrismaClient()

export const createProduct = async (product: productInterface) => {
  try {
    return prisma.product.create({
      data: {
        store_id: product.store_id,
        category_id: product.categpry_id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        stock: product.stock
      }
    })
  } catch (err) {
    throw err
  }
}