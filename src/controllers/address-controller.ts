import { Request, Response } from "express";
import loggerResponseAdapter from "@common/adapters/server/logger-response.adapter";
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";
import createAddressService from "@services/address/create-service";
import findAllAddressService from "@services/address/findall-service"; 

export const findAllAddress = async (req: Request, res: Response) => {
  try {
    const addresses = await findAllAddressService(req.user, req.query);

    if(!addresses.address.length && req.query.page) {
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
      data: addresses
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

export const createAddress = async (req: Request, res: Response) => {
  try {
    const address = await createAddressService(req.user, req.body);

    res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: address
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
      error_message: err
    })
  }
}