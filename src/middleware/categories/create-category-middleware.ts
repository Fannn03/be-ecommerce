import { NextFunction, Request, Response } from "express";
import Joi from "joi";

interface ErrorMessage {
  name?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const form = Joi.object({
    name: Joi.string()
      .required()
      .trim()
      .min(4)
      .max(30)
  })

  try {
    await form.validateAsync(req.body, {
      abortEarly: false
    })
  } catch (err: unknown) {
    const errMessage: ErrorMessage = {}
    
    if(err instanceof Joi.ValidationError) {
      err.details.map((data: Joi.ValidationErrorItem) => {
        errMessage[data.context?.key as keyof ErrorMessage] = data.message
      })

      return res.status(400).json({
        code: 400,
        result: 'bad request',
        message: errMessage
      })
    }
  }
}