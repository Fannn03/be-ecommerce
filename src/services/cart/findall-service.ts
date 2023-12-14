import { JwtPayload } from "jsonwebtoken";
import { UserJWT } from "@middleware/auth-middleware";
import { findAllCart } from "@domain/repositories/cart";
import { findStore } from "@domain/repositories/store";

export default async (user: UserJWT | JwtPayload, query: any) => {
  const take = Number(query.take) || 5;
  const skip = (Number(query.page) * take) - take || 0;
  
  const carts = await findAllCart(user.id, take, skip);

  if(!carts.length) return null;
  const mappedCarts = await Promise.all(carts[1].map(async(data: any) => {
    const store = await findStore({id: data.product.store_id});
    return {
      store: {
        id: store?.id,
        name: store?.name,
        username: store?.username,
        photo: (store?.photos) ? `stores/${store.photos}` : null
      },
      product: {
        id: data.product.id,
        slug: data.product.slug,
        name: data.product.name,
        price: data.product.price,
        quantity: data.quantity
      }
    }
  }))

  const response = {
    carts: mappedCarts,
    pages: {
      size: mappedCarts.length,
      total: carts[0],
      totalPages: (Number(query.take) !== 1) ? Math.floor(carts[0] / take) + 1 : Math.floor(carts[0] / take)
    }
  }

  return response;
}