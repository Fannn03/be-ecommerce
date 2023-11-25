import { Request, Response } from "express";
import createService, { CreateStoreError } from "../services/store/create-service";
import updateService, { UpdateStoreError } from "../services/store/update-service";
import loggerResponse from "../helpers/server/logger-response";

export const createStore = async (req: Request, res: Response) => {
  try {
    const createdStore = await createService(req)

    res.json({
      code: 200,
      result: 'success',
      message: 'success created data store',
      data: createdStore
    })

    return loggerResponse({
      req: req,
      res: res
    })
  } catch (err) {
    if(err instanceof CreateStoreError) {
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
    } else {
      const error: Error = err as Error
      res.status(500).json({
        code: 500,
        result: 'internal server error',
        message: error.message
      })

      return loggerResponse({
        req: req,
        res: res,
        error_message: error.message
      })
    }
  }
}

export const updateStore = async (req: Request, res: Response) => {
  try {
    const storeUpdated = await updateService(req)

    res.json({
      code: 200,
      result: 'success',
      message: 'success update record data',
      data: storeUpdated
    })

    return loggerResponse({
      req: req,
      res: res
    })
  } catch (err) {
    if(err instanceof UpdateStoreError) {
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
    } else {
      const error: Error = err as Error
      res.status(500).json({
        code: 500,
        result: 'internal server error',
        message: error.message
      })

      return loggerResponse({
        req: req,
        res: res,
        error_message: error.message
      })
    }
  }
}