import { findCart, updateCart } from "@domain/repositories/cart";
import { UserJWT } from "@middleware/auth-middleware";
import { JwtPayload } from "jsonwebtoken";

export default async (user: JwtPayload | UserJWT, cartId: any, body: any) => {
  const getCart = await findCart(cartId);
  if(!getCart) return null;

  try {
    const cart = await updateCart(user.id, {
      id: cartId,
      quantity: Number(body.quantity)
    })

    const response = {
      id: cart.id,
      quantity: cart.quantity,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
      product: {
        id: cart.product.id,
        name: cart.product.name,
        price: cart.product.price
      }
    }

    return response;
  } catch (err: any) {
    throw err;
  }
}