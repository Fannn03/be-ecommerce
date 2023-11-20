import { Request, Response } from "express";
import findAllProductService from '../services/product/findall-service'
import createProductService, { CreateProductError } from '../services/product/create-service'

export const findAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await findAllProductService(req.query)

    return res.json({
      code: 200,
      result: 'success',
      message: 'success get record data',
      data: products
    })
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      result: 'bad request',
      message: err.message
    })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await createProductService(req)

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