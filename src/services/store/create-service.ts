import { Request } from "express"
import fs from 'fs/promises'
import { createStore } from "../../repositories/store"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export class CreateStoreError{
  constructor(public message: string, public code: number, public result: string) {
    this.message = message
    this.code = code
    this.result = result
  }
}

export default async (request: Request) => {
  let {username, name, photos, description} = request.body

  if(request.file) {
    delete request.body.file

    const extension = request.file?.mimetype.split("/")[1]
    photos = `${request.user.id}.${extension}`
  }

  try {
    const storeCreated = await createStore({
      user_id: request.user.id,
      username: username,
      name: name,
      photos: photos,
      description: description
    })

    if(request.file) {
      // move file into public store images
      fs.rename(`public/images/temp/${request.file?.filename}`, `public/images/stores/${storeCreated.photos}`)
    }

    const response = {
      user: {
        name: storeCreated.user.name,
        email: storeCreated.user.email
      },
      store: {
        id: storeCreated.id,
        username: storeCreated.username,
        name: storeCreated.name,
        photos: storeCreated.photos,
        description: storeCreated.description,
        createdAt: storeCreated.createdAt,
      }
    }

    return response
  } catch (err) {
    // delete current file in public store images
    if(request.file) fs.unlink(`public/images/temp/${request.file?.filename}`)

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