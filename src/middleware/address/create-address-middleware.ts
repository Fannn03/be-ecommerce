import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import loggerResponse from "../../helpers/server/logger-response";

interface ErrorMessage {
  name?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const form = Joi.object({
    name: Joi.string()
      .required()
      .empty()
      .trim()
      ,
    phone: Joi.string()
      .required()
      .empty()
      .trim()
      .min(11)
      .max(13)
      .pattern(/^[0-9]+$/)
      .messages({
        'string.min': 'phone cannot less than 11 digit number',
        'string.max': 'phone cannot great than 13 digit number',
        'string.pattern.base': 'phone value must be input number'
      })
      ,
    street: Joi.string()
      .required()
      .empty()
      .trim()
      .min(4)
      ,
    zip_code: Joi.string()
      .required()
      .empty()
      .trim()
      .min(5)
      .max(5)
      .pattern(/^[0-9]+$/)
      .messages({
        'string.min': 'zip_code must be 5 digit number',
        'string.max': 'zip_code must be 5 digit number',
        'string.pattern.base': 'zip_code value must be input number'
      })
      ,
    village: Joi.string()
      .required()
      .empty()
      .trim()
      ,
    district: Joi.string()
      .required()
      .empty()
      .trim()
      ,
    regency: Joi.string()
      .required()
      .empty()
      .trim()
      ,
    province: Joi.string()
      .required()
      .empty()
      .trim()
      ,
    latitude: Joi.number()
      .required()
      .empty()
    ,
    longitude: Joi.number()
      .required()
      .empty()
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

      return loggerResponse({
        req: req,
        res: res,
        error_message: errMessage
      })
    }

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

  return next();
}