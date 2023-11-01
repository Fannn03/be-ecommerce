import { Request, Response } from "express";
import createService, { CreateStoreError } from "../services/store/create-service";
import updateService, { UpdateStoreError } from "../services/store/update-service";

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
    if(err instanceof CreateStoreError) {
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

export const updateStore = async (req: Request, res: Response) => {
  try {
    const storeUpdated = await updateService(req)

    return res.json({
      code: 200,
      result: 'success',
      message: 'success update record data',
      data: storeUpdated
    })
  } catch (err: any) {
    if(err instanceof UpdateStoreError) {
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