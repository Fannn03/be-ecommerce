import loggerResponseAdapter from "@common/adapters/server/logger-response.adapter";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

interface ErrorMessage {
  name?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const form = Joi.object({
    quantity: Joi.number()
      .required()
      .empty()
      .min(1)
  })

  try {
    await form.validateAsync(req.body, {
      abortEarly: false
    })
  } catch (err: any) {
    const errMessage: ErrorMessage = {}
    
    if(err instanceof Joi.ValidationError) {
      err.details.map((data: Joi.ValidationErrorItem) => {
        errMessage[data.context?.key as keyof ErrorMessage] = data.message
      })

      res.status(400).json({
        code: 400,
        result: 'bad request',
        message: errMessage
      })

      return loggerResponseAdapter({
        req: req,
        res: res,
        error_message: errMessage
      })
    }

    res.status(500).json({
      code: 500,
      result: 'internal server error',
      mesage: err.message
    })

    return loggerResponseAdapter({
      req: req,
      res: res,
      error_message: err.mesage
    })
  }

  return next();
}