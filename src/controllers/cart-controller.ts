import { Request, Response } from "express";
import createCartService, { CreateCartError } from '../services/cart/create-service';
import findAllCartService from "../services/cart/findall-service";
import loggerResponse from "../helpers/server/logger-response";

export const findAllCart = async (req: Request, res: Response) => {
  const carts = await findAllCartService(req.user, req.query);

  if(!carts?.carts.length && req.query.page) {
    res.status(404).json({
      code: 404,
      result: 'not found',
      message: 'data not found',
      data: null
    })

    return loggerResponse({
      req: req,
      res: res,
    })
  }

  res.json({
    code: 200,
    result: 'success',
    message: 'success get record data',
    data: carts
  })

  return loggerResponse({
    req: req,
    res: res
  })
}

export const createCart = async (req: Request, res: Response) => {
  try {
    const cart = await createCartService(req.user, req.body);

    res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: cart
    })

    return loggerResponse({
      req: req,
      res: res
    })
  } catch (err: any) {
    if (err instanceof CreateCartError) {
      res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      })

      return loggerResponse({
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

    return loggerResponse({
      req: req,
      res: res,
      error_message: err.message
    })
  } 
}