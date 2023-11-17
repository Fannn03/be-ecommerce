import { Request, Response } from "express";
import createService, { CreateProductError } from '../services/product/create-service'

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await createService(req)

    return res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: product
    })
  } catch (err: any) {
    if(err instanceof CreateProductError) {
      return res.status(404).json({
        code: err.code,
        result: err.result,
        message: err.message
      })
    } else {
      return res.status(500).json({
        code: 500,
        result: 'internal server error',
        message: err.message
      })
    }
  }
}