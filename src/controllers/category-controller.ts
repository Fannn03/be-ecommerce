import { Request, Response } from "express";
import { Category } from "@prisma/client";
import findAllCategoryService, { categoryInterface } from '../services/category/findall-service'
import categoryService, { CreateCategoryError } from '../services/category/create-service'

export const findAllCategory = async (req: Request, res: Response) => {
  try {
    const categories: categoryInterface[] = await findAllCategoryService()

    return res.json({
      code: 200,
      result: 'success',
      message: 'success get record data',
      data: categories
    })
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: err.message
    })
  }
}

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category: Category | undefined = await categoryService({
      name: req.body.name
    })

    return res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: category
    })
  } catch (err) {
    if(err instanceof CreateCategoryError) {
      return res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      })
    }

    const error: Error = err as Error
    return res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: error.message
    })
  }
}