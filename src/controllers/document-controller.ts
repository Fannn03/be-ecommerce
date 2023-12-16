import { Request, Response } from "express";
import createDocumentService from '@services/document/create-service';
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";

export const createDocument = async (req: Request, res: Response) => {
  try {
    const document = await createDocumentService(req.user, req.body);

    return res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: document
    })
  } catch (err: any) {
    if (err instanceof ValidationErrorAdapter) {
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