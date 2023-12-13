import { Request, Response } from "express";
import createDocumentService, { CreateDocumentError } from '@services/document/create-service';
import loggerResponse from "@helpers/server/logger-response";

export const createDocument = async (req: Request, res: Response) => {
  try {
    const document = await createDocumentService(req.user, req.body);

    res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: document
    })

    return loggerResponse({
      req: req,
      res: res
    })
  } catch (err: any) {
    if (err instanceof CreateDocumentError) {
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
}