import { Request, Response } from "express";
import findAllProductService from '@services/product/findall-service';
import createProductService from '@services/product/create-service';
import detailProductService from '@services/product/detail-service';
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";

export const findAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await findAllProductService(req.query)

    if(!products.products.length && req.query.page) {
      return res.status(404).json({
        code: 404,
        result: 'not found',
        message: 'record data not found'
      })
    }

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

export const detailProduct = async (req: Request, res: Response) => {
  try {
    const product = await detailProductService(req.params.slug)

    if(!product) {
      return res.status(404).json({
        code: 404,
        result: 'not found',
        message: 'record not found'
      })
    }

    return res.json({
      code: 200,
      result: 'success',
      message: 'success get record data',
      data: product
    })
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      result: 'internal server error',
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
    if(err instanceof ValidationErrorAdapter) {
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