import { Request } from "express";
import slugify from "slugify";
import { Category, Store } from "@prisma/client";
import fs from 'fs'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { findStore } from "../../repositories/store";
import { createProduct } from "../../repositories/product";
import { findCategory } from "../../repositories/category";

export interface productBodyInterface {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  destination: string,
  filename: string,
  path: string,
  size: number
}

interface productPhotosInterface {
  filename: string,
  newname: string
}

export class CreateProductError {
  constructor(public message: string, public code: number, public result: string) {
    this.message = message
    this.code = code
    this.result = result
  }
}

export default async (req: Request) => {
  const { store_id, category_id, name, photos, description, price, stock } = req.body

  try {
    const category: Category | null = await findCategory({
      id: Number(category_id)
    })
    const store: Store | null = await findStore({
      id: Number(store_id)
    })

    if(!category) throw new CreateProductError("Category doesn't exist", 400, "bad request")
    if(!store) throw new CreateProductError("Store doesn't exist", 400, "bad request")
    if(store.user_id !== req.user.id) throw new CreateProductError("You don't have any permission to create other product store", 403, "forbidden")
    
  // TODO: minimize loop file photos due reduce lack of memory if it's possible

    const localPhotos: productPhotosInterface[] = [] // used for move file photos in directory public
    const dbPhotos: any[] = [] // used for naming photos in database

    photos.map((data: productBodyInterface, index: number) => {
      const extension = data.mimetype.split('/')[1]
      const filename = slugify(`${store.username} ${name} ${new Date().getTime()}`, {
        lower: true
      })
      
      localPhotos.push({
        filename: data.filename,
        newname: `${filename}-${index + 1}.${extension}`,
      })
      dbPhotos.push({
        name: `${filename}-${index + 1}.${extension}`,
      })
    })

    const product = await createProduct({
      store_id: Number(store_id),
      categpry_id: Number(category_id),
      name: name,
      slug: slugify(`${store.username} ${name} ${new Date().getTime()}`, {
        lower: true
      }),
      description: description,
      price: Number(price),
      stock: Number(stock)
    }, dbPhotos)

    localPhotos.map((data: productPhotosInterface) => {
      fs.renameSync(`public/images/temp/${data.filename}`, `public/images/products/${data.newname}`)
    })

    const response = {
      store_id: product.store_id,
      category_id: product.category_id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      stock: product.stock,
      images: product.images.map((data: any) => ({
        product_id: data.product_id,
        name: data.name
      }))
    }

    return response
  } catch (err: any) {
    // delete file in temp directory folder
    photos.map((data: productBodyInterface) => {
      fs.rmSync(`public/images/temp/${data.filename}`)
    })

    if(err instanceof PrismaClientKnownRequestError) {
      throw new CreateProductError(err.message, 404, "bad request")
    } else {
      throw new Error(err.message)
    }
  }
}