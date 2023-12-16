import { Request, Response } from "express";
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";
import createCartService from '@services/cart/create-service';
import findAllCartService from "@services/cart/findall-service";
import updateCartService from "@services/cart/update-service";
import deleteCartService from "@services/cart/delete-service";

export const findAllCart = async (req: Request, res: Response) => {
  const carts = await findAllCartService(req.user, req.query);

  if(!carts?.carts.length && req.query.page) {
    return res.status(404).json({
      code: 404,
      result: 'not found',
      message: 'data not found',
      data: null
    })
  }

  return res.json({
    code: 200,
    result: 'success',
    message: 'success get record data',
    data: carts
  })
}

export const createCart = async (req: Request, res: Response) => {
  try {
    const cart = await createCartService(req.user, req.body);

    return res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: cart
    })
  } catch (err: any) {
    if (err instanceof ValidationErrorAdapter) {
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

export const updateCart = async (req: Request, res: Response) => {
  try {
    const cart = await updateCartService(req.user, req.params.id, req.body);

    if(!cart) {
      return res.status(404).json({
        code: 404,
        result: 'not found',
        message: 'record to update not found'
      })
    }

    return res.json({
      code: 200,
      result: 'success',
      message: 'success update record data',
      data: cart
    })
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: err.message
    })
  }
}

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const cart = await deleteCartService(req.user, req.params.id);

    if(!cart) return res.status(404).json({
      code: 404,
      result: 'not found',
      message: 'record to update not found'
    })

    return res.json({
      code: 200,
      result: 'success',
      message: 'success delete record data',
      data: cart
    })
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: err.message
    })
  }
}