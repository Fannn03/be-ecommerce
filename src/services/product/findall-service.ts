import { Product } from "@prisma/client"
import { findAllProduct } from "../../repositories/product"

export interface categoriesQuery {
  name?: string,
  slug?: string
}

export default async (query: any) => {
  try {
    const take = Number(query.take) || 10
    const skip = (Number(query.page) * take) - take || 0
    let categories: categoriesQuery = {};

    if(query.category) categories.name = query.category;

    const products: Product[] = await findAllProduct(take, skip, categories)
    const response: any = []

    products.map((data: any) => {
      const payload = {
        id: data.id,
        name: data.name,
        slug: data.slug,
        price: data.price,
        image: `products/${data.images[0].name}`
      }

      response.push(payload)
    })

    return response
  } catch (err) {
    throw err
  }
}