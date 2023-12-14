import { Request, Response } from "express";
import findAllProductService from '@services/product/findall-service'
import createProductService, { CreateProductError } from '@services/product/create-service'
import detailProductService from '@services/product/detail-service'
import loggerResponseAdapter from "@common/adapters/server/logger-response.adapter";

export const findAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await findAllProductService(req.query)

    if(!products.products.length && req.query.page) {
      res.status(404).json({
        code: 404,
        result: 'not found',
        message: 'record data not found'
      })

      return loggerResponseAdapter({
        req: req,
        res: res
      })
    }

    res.json({
      code: 200,
      result: 'success',
      message: 'success get record data',
      data: products
    })

    return loggerResponseAdapter({
      req: req,
      res: res
    })
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      result: 'bad request',
      message: err.message
    })

    return loggerResponseAdapter({
      req: req,
      res: res,
      error_message: err.message
    })
  }
}

export const detailProduct = async (req: Request, res: Response) => {
  try {
    const product = await detailProductService(req.params.slug)

    if(!product) {
      res.status(404).json({
        code: 404,
        result: 'not found',
        message: 'record not found'
      })

      return loggerResponseAdapter({
        req: req,
        res: res,
      })
    }

    res.json({
      code: 200,
      result: 'success',
      message: 'success get record data',
      data: product
    })

    return loggerResponseAdapter({
      req: req,
      res: res,
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

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await createProductService(req)

    res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: product
    })

    return loggerResponseAdapter({
      req: req,
      res: res,
    })
  } catch (err: any) {
    if(err instanceof CreateProductError) {
      res.status(404).json({
        code: err.code,
        result: err.result,
        message: err.message
      })

      return loggerResponseAdapter({
        req: req,
        res: res,
        error_message: err.message
      })
    } else {
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
}