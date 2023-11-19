import { findAllProduct } from "../../repositories/product"

export default async (query: any) => {
  console.log(query)
  try {
    const products = await findAllProduct(10, 0)

    return products
  } catch (err) {
    throw err
  }
}