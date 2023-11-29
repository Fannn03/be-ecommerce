import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import fs from 'fs'
import { productBodyInterface } from "../../services/product/create-service";
import loggerResponse from "../../helpers/server/logger-response";

interface ErrorMessage {
  name?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  req.body.photos = req.files

  const form = Joi.object({
    store_id: Joi.number()
      .required()
      .empty()
      ,
    category_id: Joi.number()
      .required()
      .empty()
      ,
    name: Joi.string()
      .required()
      .empty()
      .trim()
      .min(4)
      .max(50)
      ,
    photos: Joi.array()
    .required()
    .empty()
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
      .empty()
      .trim()
      ,
    price: Joi.number()
      .required()
      .empty()
      .min(500)
      .max(10000000)
      ,
    stock: Joi.number()
      .required()
      .empty()
      .min(1)
      .max(10000)
  })

  try {
    await form.validateAsync(req.body, {
      abortEarly: false
    })
  } catch (err: any) {
    const errMessage: ErrorMessage = {}
    // delete product photos in temp directory
    if(req.body.photos?.length) {
      req.body.photos.map((data: productBodyInterface) => {
        fs.rmSync(`public/images/temp/${data.filename}`)
      })
    }
    
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