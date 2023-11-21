import { findProduct } from "../../repositories/product"

export default async (query: string) => {
  try {
    const product = await findProduct({
      slug: query
    })

    if(!product) return null;

    const response = {
      name: product?.name,
      slug: product?.slug,
      description: product?.description,
      price: product?.price,
      stock: product?.stock,
      createdAt: product?.createdAt,
      updatedAt: product?.updatedAt,
      store: {
        username: product?.store.username,
        name: product?.store.name,
        photo: product?.store.photos,
        createdAt: product?.store.createdAt,
        updatedAt: product?.store.updatedAt
      },
      images: product?.images.map((data: any) => ({
        name: data.name
      }))
    }

    return response
  } catch(err) {
    throw err
  }
}