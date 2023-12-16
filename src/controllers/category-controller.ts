import { Request, Response } from "express";
import { Category } from "@prisma/client";
import findAllCategoryService from '@services/category/findall-service';
import categoryService from '@services/category/create-service';
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";

export const findAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await findAllCategoryService(req.query);

    if(!categories.categories.length && req.query.page) {
      return res.status(400).json({
        code: 400,
        result: 'not found',
        message: 'record not found'
      })
    }

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
      name: req.body.name,
      photos: req.body.photos
    })

    return res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: category
    })
  } catch (err: any) {
    if(err instanceof ValidationErrorAdapter) {
      return res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      })
    }

    return res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: err.message
    })
  }
}