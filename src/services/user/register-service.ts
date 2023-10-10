import { Request } from "express";
import { insertUser } from "../../repositories/user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export interface RegisterBody {
  email: string,
  name: string,
  password: string
}

export default async (request: RegisterBody) => {
  try {
    await insertUser(request);
  } catch (err) {
    if(err instanceof PrismaClientKnownRequestError) {
      if(err.code === "P2002" && err.meta?.target === "users_email_key") {
        throw new Error("Email already taken")
      } else if (err.code === "P2002" && err.meta?.target === "users_name_key") {
        throw new Error("Name already taken")
      } else {
        throw err
      }
    }
  }
}