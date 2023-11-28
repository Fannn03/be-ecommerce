import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import fs from 'fs';
import loggerResponse from "../../helpers/server/logger-response";

interface ErrorMessage {
  name?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  if(req.file) req.body.photos = req.file

  const form = Joi.object({
    name: Joi.string()
      .required()
      .empty()
      .trim()
      .min(4)
      .max(30)
      ,
    photos: Joi.any()
      .required()
      .empty()
      .custom((value: Express.Multer.File, helpers) => {
        const extensions = ['image/png', 'image/jpg', 'image/jpeg']
        
        if(!extensions.includes(value.mimetype)) {
          return helpers.error('any.invalid');
        }
      })
      .messages({
        'any.invalid': 'File type must be PNG, JPG, or JPEG'
      })
  })

  try {
    await form.validateAsync(req.body, {
      abortEarly: false
    })
  } catch (err: any) {
    if(req.file) {
      fs.rmSync(req.file.path);
    }

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

  return next()
}