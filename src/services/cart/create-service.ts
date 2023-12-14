import { JwtPayload } from "jsonwebtoken";
import { createCart } from "@domain/repositories/cart";
import { UserJWT } from "@middleware/auth-middleware";
import { findProduct } from "@domain/repositories/product";
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";

export default async (user: UserJWT | JwtPayload, body: any) => {
  const getProduct = await findProduct({
    id: Number(body.product_id)
  })
  if(!getProduct) throw new ValidationErrorAdapter("Product doesn't exist", 404, "not found");

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