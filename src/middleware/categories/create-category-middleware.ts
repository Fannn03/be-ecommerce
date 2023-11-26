import { NextFunction, Request, Response } from "express";
import Joi from "joi";

interface ErrorMessage {
  name?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  req.body.photos = req.files

  const form = Joi.object({
    name: Joi.string()
      .required()
      .trim()
      .min(4)
      .max(30)
      ,
    photos: Joi.any()
      .required()
      .custom((value, helpers) => {
        const extensions = ['image/png', 'image/jpg', 'image/jpeg']

        for(let file in value) {
          if(!extensions.includes(value[file].mimetype)) {
            return helpers.error('any.invalid')
          }
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