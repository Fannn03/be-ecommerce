import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import slugify from "slugify";
import fs from 'fs';
import { createCategory } from "@domain/repositories/category"

interface CreateBody {
  name: string
  photos: Express.Multer.File
}

export class CreateCategoryError{
  constructor (public message: string, public code: number, public result: string) {
    this.message = message;
    this.code = code;
    this.result = result;
  }
}

export default async (request: CreateBody) => {
  const extension = request.photos.mimetype.split('/')[1];
  const filename = slugify(`${request.name}.${extension}`, {
    lower: true
  });

  try {
    const category = await createCategory({
      name: request.name,
      slug: slugify(request.name, {
        lower: true,
      }),
      photos: filename
    })

    fs.renameSync(request.photos.path, `public/images/categories/${category.photos}`);
    return category;
  } catch (err) {
    if(err instanceof PrismaClientKnownRequestError) {
      if(err.code === "P2002" && err.meta?.target === "categories_name_key") {
        throw new CreateCategoryError("Category name already exist", 400, "bad request")
      }
    } else {
      throw err
    }
  }
}