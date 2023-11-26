import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import fs from 'fs';

interface ErrorMessage {
  name?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  if(req.file) req.body.photos = req.file

  const form = Joi.object({
    name: Joi.string()
      .required()
      .trim()
      .min(4)
      .max(30)
      ,
    photos: Joi.any()
      .required()
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
  } catch (err: unknown) {
    if(req.file) {
      fs.rmSync(req.file.path);
    }

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

  return next()
}