import { Request, Response } from "express";
import createDocumentService, { CreateDocumentError } from '../services/document/create-service';

export const createDocument = async (req: Request, res: Response) => {
  try {
    const document = await createDocumentService(req.user, req.body);

    res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: document
    })
  } catch (err: any) {
    if (err instanceof CreateDocumentError) {
      return res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      })
    } else {
      return res.status(500).json({
        code: 500,
        result: 'internal server error',
        message: err.message
      })
    }
  }
}