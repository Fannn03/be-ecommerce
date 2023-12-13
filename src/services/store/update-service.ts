import { Request } from "express"
import fs from 'fs/promises'
import { updateStore } from "@domain/repositories/store"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export class UpdateStoreError{
  constructor(public message: string, public code: number, public result: string) {
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
    const storeUpdated = await updateStore(request.body)

    if(request.file) {
      // check if photo is db is exist and images in public store is exist
      if(storeUpdated.photos) {
        try {
          await fs.readFile(`public/images/stores/${storeUpdated.photos}`)
          fs.unlink(`public/images/stores/${storeUpdated.photos}`)
        } catch (err) {
          console.log('no file image stores found in previous value, skipping remove images');
        }
      }

      // move file into public store images
      fs.rename(`public/images/temp/${request.file?.filename}`, `public/images/stores/${storeUpdated.photos}`)
    }

    const response = {
      user: {
        name: storeUpdated.user.name,
        email: storeUpdated.user.email
      },
      store: {
        id: storeUpdated.id,
        username: storeUpdated.username,
        name: storeUpdated.name,
        photos: `stores/${storeUpdated.photos}`,
        description: storeUpdated.description,
        updatedAt: storeUpdated.updatedAt,
      }
    }

    return response
  } catch (err) {
    // delete current file in public store images
    if(request.file) fs.unlink(`public/images/temp/${request.file?.filename}`)

    if(err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002" && err.meta?.target === "stores_username_key") {
        throw new UpdateStoreError("Username store already taken", 400, "bad request")
      } else if (err.code === "P2025" && err.meta?.cause === "Record to update not found.") {
        throw new UpdateStoreError("Record to update not found", 404, "not found")
      } else {
        throw err
      }
    } else {
      throw err
    }
  }
}