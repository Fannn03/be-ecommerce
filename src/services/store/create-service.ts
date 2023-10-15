import { JwtPayload } from "jsonwebtoken"
import { createStore } from "../../repositories/store"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export interface CreateStore {
  user_id: string,
  username: string,
  name: string,
  file?: string,
  description?: string
}

export class CreateStoreError extends Error {
  constructor(message: string, public code: number, public result: string) {
    super()
    this.message = message
    this.code = code
    this.result = result
  }
}

export default async (request: CreateStore, user: JwtPayload) => {
  if(request.file) request.file = "photo.jpg"
  request.user_id = user.id
  
  try {
    await createStore(request)
  } catch (err) {
    if(err instanceof PrismaClientKnownRequestError) {
      if(err.code === "P2002" && err.meta?.target === "stores_user_id_key") {
        throw new CreateStoreError("This account already has store exists", 400, "bad request")
      } else if (err.code === "P2002" && err.meta?.target === "stores_username_key") {
        throw new CreateStoreError("Username store already taken", 400, "bad request")
      }
    } else {
      throw err
    }
  }
}