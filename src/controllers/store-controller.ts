import { Request, Response } from "express";
import createService, { CreateStoreError } from "../services/store/create-service";

export const createStore = async (req: Request, res: Response) => {
  try {
    await createService(req.body, req.user)
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

  return res.json({
    code: 200,
    result: 'success',
    message: 'success created data store'
  })
}