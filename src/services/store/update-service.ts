import { Request } from "express"
import fs from 'fs/promises'
import { updateStore } from "../../repositories/store"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export class UpdateStoreError extends Error {
  constructor (public message: string, public code: number, public result: string) {
    super()
    this.message = message
    this.code = code
    this.result = result
  }
}

export default async (request: Request) => {
  request.body.user_id = request.user.id

  if(request.file) {
    delete request.body.file

    const extension = request.file?.mimetype.split("/")[1]
    request.body.photos = `${request.user.id}.${extension}`
  }

  try {
    const store = await updateStore(request.body)

    if(request.file) {
      // move file into public store images
      if(store.photos) fs.unlink(`public/images/stores/${store.photos}`)
      fs.rename(`public/images/temp/${request.file?.filename}`, `public/images/stores/${request.body.photos}`)
    }
  } catch (err) {
    // delete current file in public store images
    if(request.file) fs.unlink(`public/images/temp/${request.file?.filename}`)

    if(err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002" && err.meta?.target === "stores_username_key") {
        throw new UpdateStoreError("Username store already taken", 400, "bad request")
      }
    }else {
      throw err
    }
  }
}