import { Request } from "express";
import { updateUser } from "../../repositories/user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class UserUpdateError extends Error {
  constructor(message: string, public code: number, public result: string) {
    super()
    this.message = message
    this.code = code
    this.result = result
  }
}

export default async (req: Request) => {
  req.body.id = req.user.id

  try {
    await updateUser(req.body)
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