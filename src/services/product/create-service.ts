import { Request } from "express";
import { findStore } from "../../repositories/store";
import { Category, Store } from "@prisma/client";
import { createProduct } from "../../repositories/product";
import slugify from "slugify";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { findCategory } from "../../repositories/category";

export class CreateProductError {
  constructor(public message: string, public code: number, public result: string) {
    this.message = message
    this.code = code
    this.result = result
  }
}

export default async (req: Request) => {
  const { store_id, category_id, name, description, price, stock } = req.body

  const category: Category | null = await findCategory({
    id: Number(category_id)
  })
  const store: Store | null = await findStore({
    id: Number(store_id)
  })

  if(!category) throw new CreateProductError("Category doesn't exist", 400, "bad request")
  if(!store) throw new CreateProductError("Store doesn't exist", 403, "forbidden")
  if(store.user_id !== req.user.id) throw new CreateProductError("You don't have any permission to create other product store", 403, "forbidden")

  try {
    return await createProduct({
      store_id: Number(store_id),
      categpry_id: Number(category_id),
      name: name,
      slug: slugify(`${store.username} ${name} ${new Date().getTime()}`, {
        lower: true
      }),
      description: description,
      price: Number(price),
      stock: Number(stock)
    })
  } catch (err: any) {
    if(err instanceof PrismaClientKnownRequestError) {
      throw new CreateProductError(err.message, 404, "bad request")
    } else {
      throw new Error(err.message)
    }
  }
}