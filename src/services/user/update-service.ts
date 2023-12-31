import { Request } from "express";
import { updateUser } from "@domain/repositories/user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";

interface Response {
  id        : string,
  email     : string,
  name      : string,
  updatedAt : Date
}

export default async (req: Request) => {
  try {
    const updatedUser = await updateUser({
      id: req.user.id,
      email: req.body.email,
      name: req.body.name
    })

    const response: Response = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      updatedAt: updatedUser.updatedAt
    }

    return response
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002" && err.meta?.target === "users_name_key") {
        throw new ValidationErrorAdapter("Name already taken", 400, "bad request")
      } else {
        throw err
      }
    } else {
      throw err
    }
  }
}