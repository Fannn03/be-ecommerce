import { Request, Response } from "express";
import { Category } from "@prisma/client";
import findAllCategoryService, { categoryInterface } from '@services/category/findall-service'
import categoryService from '@services/category/create-service'
import loggerResponseAdapter from "@common/adapters/server/logger-response.adapter";
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";

export const findAllCategory = async (req: Request, res: Response) => {
  try {
    const categories: categoryInterface[] = await findAllCategoryService()

    res.json({
      code: 200,
      result: 'success',
      message: 'success get record data',
      data: categories
    })

    return loggerResponseAdapter({
      req: req,
      res: res
    })
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: err.message
    })

    return loggerResponseAdapter({
      req: req,
      res: res,
      error_message: err.message
    })
  }
}

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category: Category | undefined = await categoryService({
      name: req.body.name,
      photos: req.body.photos
    })

    res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: category
    })

    return loggerResponseAdapter({
      req: req,
      res: res
    })
  } catch (err: any) {
    if(err instanceof ValidationErrorAdapter) {
      res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      })

      return loggerResponseAdapter({
        req: req,
        res: res,
        error_message: err.message
      })
    }

    res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: err.message
    })

    return loggerResponseAdapter({
      req: req,
      res: res,
      error_message: err.message
    })
  }
}