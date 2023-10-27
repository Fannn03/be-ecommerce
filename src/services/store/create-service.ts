import { JwtPayload } from "jsonwebtoken"
import { Request } from "express"
import fs from 'fs/promises'
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

export default async (request: Request, user: JwtPayload) => {
  request.body.user_id = user.id
  
  if(request.file) {
    delete request.body.file

    const extension = request.file?.mimetype.split("/")[1]
    request.body.photos = `${user.id}.${extension}`

    fs.rename(`public/images/temp/${request.file?.filename}`, `public/images/stores/${request.body.photos}`)
  }

  try {
    await createStore(request.body)
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