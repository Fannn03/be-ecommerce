import { Request, Response } from "express";
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";
import createAddressService from "@services/address/create-service";
import findAllAddressService from "@services/address/findall-service"; 

export const findAllAddress = async (req: Request, res: Response) => {
  try {
    const addresses = await findAllAddressService(req.user, req.query);

    if(!addresses.address.length && req.query.page) {
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
      data: addresses
    })
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: err.message
    })
  }
}

export const createAddress = async (req: Request, res: Response) => {
  try {
    const address = await createAddressService(req.user, req.body);

    return res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: address
    })
  } catch (err: any) {
    if(err instanceof ValidationErrorAdapter) {
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