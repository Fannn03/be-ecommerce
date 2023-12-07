import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import fs from 'fs';
import loggerResponse from "../../helpers/server/logger-response";

interface ErrorMessage {
  product_id?: string,
  rating?: string,
  comment?: string,
  photos?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  if(req.files) req.body.photos = req.files;

  const form = Joi.object({
    product_id: Joi.number()
      .required()
      .empty()
      ,
    rating: Joi.number()
      .required()
      .empty()
      .min(1)
      .max(5)
      ,
    comment: Joi.string()
      .required()
      .empty()
      .trim()
      .min(4)
      ,
    photos: Joi.array()
      .optional()
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
  })

  try {
    await form.validateAsync(req.body, {
      abortEarly: false
    })
  } catch (err: any) {
    const errMessage: ErrorMessage = {}
    if(req.body.photos?.length) {
      const photos = req.body.photos;
      for(let photo in photos) {
        fs.rmSync(photos[photo].path);
      }
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

  return next();
}