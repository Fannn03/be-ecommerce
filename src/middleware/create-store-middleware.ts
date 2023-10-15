import { NextFunction, Request, Response } from "express";
import Joi from "joi";

interface ErrorMessage {
  username?: string,
  name?: string,
  file?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  if(req.file) req.body.file = req.file

  const form = Joi.object({
    username: Joi.string()
      .required()
      .trim()
      .min(5)
      .max(18)
      .pattern(/^\S*$/)
			.messages({
				'string.pattern.base': "username cannot contains whitespace"
			}),
    name: Joi.string()
      .required()
      .trim()
      .min(5)
      .max(24),
    file: Joi.any()
      .optional()
      .custom((value, helper) => {
        const extensions = ['image/png', 'image/jpg', 'image/jpeg']

        if(!extensions.includes(value.mimetype)) {
          return helper.error("any.invalid")
        }
      })
      .messages({
        'any.invalid': "File type must be a PNG, JPG, or JPEG"
      })
  })

  try {
    await form.validateAsync(req.body, {
      abortEarly: false
    })      

  } catch (err) {
    let errMessages: ErrorMessage = {}

    if(err instanceof Joi.ValidationError) {
      err.details.map((data: Joi.ValidationErrorItem) => {
        if(data.context?.key) errMessages[data.context?.key as keyof ErrorMessage] = data.message
      })
    }
    
    return res.status(400).json({
      code: 400,
      result: 'bad request',
      message: errMessages
    })
  }

  return next()
}