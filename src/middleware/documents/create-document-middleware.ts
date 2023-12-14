import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import fs from 'fs'
import loggerResponseAdapter from "@common/adapters/server/logger-response.adapter";

interface ErrorMessage {
  username?: string,
  name?: string,
  file?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  if(req.file) req.body.photos = req.file;

  const form = Joi.object({
    fullname: Joi.string()
      .required()
      .empty()
      .trim()
      .min(4)
      ,
    nik: Joi.string()
      .required()
      .empty()
      .trim()
      // source regex nik ktp https://www.huzefril.com/posts/regex/regex-ktp/
      .regex(RegExp("^\\d{16}$"))
      .messages({
        "string.pattern.base": "Invalid nik value"
      })
      ,
    photos: Joi.any()
      .required()
      .empty()
      .custom((value, helper) => {
        const allowedExtension = ['image/png', 'image/jpeg', 'image/jpg'];

        if(!allowedExtension.includes(value.mimetype)) {
          return helper.error('any.invalid');
        }
      })
      .messages({
        'any.invalid': "File type must be PNG, JPG, or JPEG"
      })
  })

  try {
    await form.validateAsync(req.body, {
      abortEarly: false
    })
  } catch (err: any) {
    let errMessages: ErrorMessage = {}

    // delete file if exist
    if(req.file) fs.rmSync(req.file.path);

    if(err instanceof Joi.ValidationError) {
      err.details.map((data: Joi.ValidationErrorItem) => {
        if(data.context?.key) errMessages[data.context?.key as keyof ErrorMessage] = data.message;
      })

      res.status(400).json({
        code: 400,
        result: 'bad request',
        message: errMessages
      });

      return loggerResponseAdapter({
        req: req,
        res: res,
        error_message: err.message
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

  return next();
}