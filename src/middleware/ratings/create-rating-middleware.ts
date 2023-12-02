import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export default async (req: Request, res: Response, next: NextFunction) => {
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
      .required()
      .empty()
      .min(1)
  })

  try {
    await form.validateAsync(req.body, {
      abortEarly: false
    })
  } catch (err) {
    throw err
  }
}