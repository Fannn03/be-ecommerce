import { NextFunction, Request, Response } from 'express'
import Joi, { ValidationError, ValidationErrorItem } from 'joi'
import loggerResponseAdapter from '@common/adapters/server/logger-response.adapter'

interface ErrorMessages {
	email?: string,
	name?: string,
	password?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
	const request = Joi.object({
		email: Joi.string()
			.required()
			.empty()
			.trim()
			.email(),
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
		password: Joi.string()
			.required()
			.empty()
			.trim()
			.min(5)
			.max(24)
			.pattern(/^\S*$/, {name: "password"})
			.messages({
				'string.pattern.name': "password cannot contains whitespace"
			}),
	})

	try {
		await request.validateAsync(req.body, {
			abortEarly: false
		})
	} catch (err: any) {
		if(err instanceof ValidationError) {
			
			let errMessages: ErrorMessages = {}
		
			err.details.map((err: ValidationErrorItem) => {
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