import { Request, Response } from "express";
import createAddressService from "../services/address/create-service";
import loggerResponse from "../helpers/server/logger-response";

export const createAddress = async (req: Request, res: Response) => {
  try {
    const address = await createAddressService(req.user, req.body);

    res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: address
    })

    return loggerResponse({
      req: req,
      res: res
    })
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: err.message
    })

    return loggerResponse({
      req: req,
      res: res,
      error_message: err
    })
  }
}