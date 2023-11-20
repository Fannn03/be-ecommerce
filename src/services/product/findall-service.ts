import { Product } from "@prisma/client"
import 'dotenv/config'
import { findAllProduct } from "../../repositories/product"

export default async (query: any) => {
  try {
    const take = Number(query.take) || 10
    const skip = (Number(query.page) * take) - take || 0

    const products: Product[] = await findAllProduct(take, skip)
    const response: any = []

    products.map((data: any) => {
      const payload = {
        id: data.id,
        name: data.name,
        slug: data.slug,
        price: data.price,
        image: `${process.env.BASE_URL}/images/products/${data.images[0].name}`
      }

      response.push(payload)
    })

    return response
  } catch (err) {
    throw err
  }
}