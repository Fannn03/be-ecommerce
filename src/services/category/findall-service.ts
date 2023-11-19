import { Category } from "@prisma/client"
import { findAllCategory } from "../../repositories/category"

export interface categoryInterface {
  id        :   number,
  name      :   string,
  slug      :   string,
  createdAt :   Date,
  updatedAt :   Date
}

export default async () => {
  try {
    const categories = await findAllCategory()
    const response: categoryInterface[] = []

    categories.map((data: Category) => {
      const payload = {
        id: data.id,
        name: data.name,
        slug: data.slug,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }

      response.push(payload)
    })
    
    return response
  } catch (err) {
    throw err
  }
}