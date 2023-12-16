import { deleteCart, findCart } from "@domain/repositories/cart";
import { UserJWT } from "@middleware/auth-middleware";
import { JwtPayload } from "jsonwebtoken";

export default async (user: JwtPayload | UserJWT, cartId: string) => {
  const getCart = await findCart(cartId);
  if(!getCart) return null;

  try {
    const cart = await deleteCart(user.id, cartId);

    return cart;
  } catch (err: any) {
    throw err;
  }
}