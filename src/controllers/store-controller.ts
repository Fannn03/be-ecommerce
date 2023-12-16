import { Request, Response } from "express";
import createService from "@services/store/create-service";
import updateService from "@services/store/update-service";
import detailService from "@services/store/detail-service";
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";

export const createStore = async (req: Request, res: Response) => {
  try {
    const createdStore = await createService(req)

    return res.json({
      code: 200,
      result: 'success',
      message: 'success created data store',
      data: createdStore
    })
  } catch (err) {
    if(err instanceof ValidationErrorAdapter) {
      return res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      })
    } else {
      const error: Error = err as Error
      return res.status(500).json({
        code: 500,
        result: 'internal server error',
        message: error.message
      })
    }
  }
}

export const detailStore = async (req: Request, res: Response) => {
  try {
    const store = await detailService(req.params.username);

    if(!store)  {
      return res.status(404).json({
        code: 404,
        result: 'not found',
        message: 'record not found',
        data: store
      })
    } else {
      return res.json({
        code: 200,
        result: 'success',
        message: 'success get record data',
        data: store
      })
    }
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: err.message
    })
  }
}

export const updateStore = async (req: Request, res: Response) => {
  try {
    const storeUpdated = await updateService(req)

    return res.json({
      code: 200,
      result: 'success',
      message: 'success update record data',
      data: storeUpdated
    })
  } catch (err) {
    if(err instanceof ValidationErrorAdapter) {
      return res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      })
    } else {
      const error: Error = err as Error
      return res.status(500).json({
        code: 500,
        result: 'internal server error',
        message: error.message
      })
    }
  }
}