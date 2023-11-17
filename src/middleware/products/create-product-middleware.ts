import { NextFunction, Request, Response } from "express";
import Joi from "joi";

interface ErrorMessage {
  name?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const form = Joi.object({
    store_id: Joi.string()
      .required()
      .trim()
      ,
    category_id: Joi.number()
      .required()
      ,
    name: Joi.string()
      .required()
      .trim()
      .min(4)
      .max(50)
      ,
    description: Joi.string()
      .required()
      .trim()
      ,
    price: Joi.number()
      .required()
      .min(500)
      .max(10000000)
      ,
    stock: Joi.number()
      .required()
      .min(1)
      .max(10000)
  })

  try {
    await form.validateAsync(req.body, {
      abortEarly: false
    })
  } catch (err) {
    const errMessage: ErrorMessage = {}
    
    if(err instanceof Joi.ValidationError) {
      err.details.map((data: Joi.ValidationErrorItem) => {
        errMessage[data.context?.key as keyof ErrorMessage] = data.message
      })
    }

    return res.status(400).json({
      code: 400,
      result: 'bad request',
      message: errMessage
    })
  }

  return next()
}