import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { createCategory } from "../../repositories/category"

interface CreateBody {
  name: string
}

export class CreateCategoryError extends Error {
  constructor (public message: string, public code: number, public result: string) {
    super();
    this.message = message;
    this.code = code;
    this.result = result;
  }
}

export default async (request: CreateBody) => {
  try {
    return await createCategory({
      name: request.name
    })
  } catch (err) {
    if(err instanceof PrismaClientKnownRequestError) {
      if(err.code === "P2002" && err.meta?.target === "categories_name_key") {
        throw new CreateCategoryError("Category name already exist", 400, "bad request")
      }
    } else {
      throw err
    }
  }
}