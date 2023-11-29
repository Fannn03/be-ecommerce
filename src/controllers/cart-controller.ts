import { Request, Response } from "express";
import createCartService, { CreateCartError } from '../services/cart/create-service';
import loggerResponse from "../helpers/server/logger-response";

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