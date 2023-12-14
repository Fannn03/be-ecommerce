import { Request, Response } from "express";
import createService from "@services/store/create-service";
import updateService, { UpdateStoreError } from "@services/store/update-service";
import detailService from "@services/store/detail-service";
import loggerResponseAdapter from "@common/adapters/server/logger-response.adapter";
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";

export const createStore = async (req: Request, res: Response) => {
  try {
    const createdStore = await createService(req)

    res.json({
      code: 200,
      result: 'success',
      message: 'success created data store',
      data: createdStore
    })

    return loggerResponseAdapter({
      req: req,
      res: res
    })
  } catch (err) {
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
    } else {
      const error: Error = err as Error
      res.status(500).json({
        code: 500,
        result: 'internal server error',
        message: error.message
      })

      return loggerResponseAdapter({
        req: req,
        res: res,
        error_message: error.message
      })
    }
  }
}

export const detailStore = async (req: Request, res: Response) => {
  try {
    const store = await detailService(req.params.username);

    if(!store)  {
      res.status(404).json({
        code: 404,
        result: 'not found',
        message: 'record not found',
        data: store
      })
    } else {
      res.json({
        code: 200,
        result: 'success',
        message: 'success get record data',
        data: store
      })
    }

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

export const updateStore = async (req: Request, res: Response) => {
  try {
    const storeUpdated = await updateService(req)

    res.json({
      code: 200,
      result: 'success',
      message: 'success update record data',
      data: storeUpdated
    })

    return loggerResponseAdapter({
      req: req,
      res: res
    })
  } catch (err) {
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
    } else {
      const error: Error = err as Error
      res.status(500).json({
        code: 500,
        result: 'internal server error',
        message: error.message
      })

      return loggerResponseAdapter({
        req: req,
        res: res,
        error_message: error.message
      })
    }
  }
}