import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import loggerResponseAdapter from "@common/adapters/server/logger-response.adapter";

interface ErrorMessages {
  email?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const form = Joi.object({
    name: Joi.string()
			.required()
			.empty()
			.trim()
			.min(4)
			.max(32)
			.pattern(/^\S*$/, {name: "name"})
			.messages({
				'string.pattern.name': "name cannot contains whitespace"
			}),
  })

  try {
    await form.validateAsync(req.body, {
      abortEarly: false
    })
  } catch (err: any) {
    if(err instanceof Joi.ValidationError) {
			let errMessages: ErrorMessages = {}
		
			err.details.map((err: Joi.ValidationErrorItem) => {
				if(err.context?.key) errMessages[err.context?.key as keyof ErrorMessages] = err.message
			})

			res.status(400).json({
				code: 400,
				result: 'bad request',
				message: errMessages
			})

			return loggerResponseAdapter({
        req: req,
        res: res,
        error_message: errMessages
      })
		}

    res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: err.message
    })

    return loggerResponseAdapter({
      req: req,
      res: res,
      error_message: err.message
    })
  }

  return next()
}