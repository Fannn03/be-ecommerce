import { findAllProduct } from "@domain/repositories/product"

export interface categoriesQuery {
  name?: string,
  slug?: string
}

export default async (query: any) => {
  try {
    const take = Number(query.take) || 10
    const skip = (Number(query.page) * take) - take || 0
    let categories: categoriesQuery = {};

    if(query.category) categories.slug = query.category;

    const products = await findAllProduct(take, skip, categories)
    const mapProducts = products[1].map((data: any) => (
      {
        id: data.id,
        name: data.name,
        slug: data.slug,
        price: data.price,
        image: `products/${data.images[0].name}`
      }
    ));

    const response = {
      products: mapProducts,
      pages: {
        size: mapProducts.length,
        total: products[0],
        totalPages: Math.ceil(products[0] / take)
      }
    };

    return response;
  } catch (err) {
    throw err
  }
}