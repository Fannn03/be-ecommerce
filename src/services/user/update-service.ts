import { Request } from "express";
import { updateUser } from "../../repositories/user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface Response {
  id        : string,
  email     : string,
  name      : string,
  updatedAt : Date
}

export class UserUpdateError{
  constructor(public message: string, public code: number, public result: string) {
    this.message = message
    this.code = code
    this.result = result
  }
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
        throw new UserUpdateError("Name already taken", 400, "bad request")
      }
    } else {
      throw err
    }
  }
}