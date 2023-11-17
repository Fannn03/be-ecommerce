import { NextFunction, Request, Response } from "express";
import Joi from "joi";

interface ErrorMessage {
  name?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  req.body.photos = req.files

  const form = Joi.object({
    store_id: Joi.number()
      .required()
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
    photos: Joi.array()
    .min(1)
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

  // return next()
  return res.send('check log')
}