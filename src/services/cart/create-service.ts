import { JwtPayload } from "jsonwebtoken";
import { createCart } from "../../repositories/cart";
import { UserJWT } from "../../middleware/auth-middleware";
import { findProduct } from "../../repositories/product";

export class CreateCartError {
  constructor (public message: string, public code: number, public result: string) {
    this.message = message;
    this.code = code;
    this.result = result;
  }
}

export default async (user: UserJWT | JwtPayload, body: any) => {
  const getProduct = await findProduct({
    id: Number(body.product_id)
  })
  if(!getProduct) throw new CreateCartError("Product doesn't exist", 404, "not found");

  try {
    const cart = await createCart({
      user_id: user.id,
      product_id: Number(body.product_id),
      quantity: Number(body.quantity)
    });

    const response = {
      id: cart.id,
      user_id: cart.user_id,
      product_id: cart.product_id,
      quantity: cart.quantity,
      createdAt: cart.createdAt,
    }

    return response
  } catch (err) {
    throw err
  }
}