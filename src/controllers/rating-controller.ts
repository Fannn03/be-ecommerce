import { Request, Response } from "express";
import createRatingService from '@services/rating/create-service';
import findAllRatingService from '@services/rating/findall-service';
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";

export const findAllRating = async (req: Request, res: Response) => {
  try {
    const ratings = await findAllRatingService(req.params.slug, req.query);
    if(!ratings || (!ratings?.comment.length && req.query.page)) {
      return res.status(404).json({
        code: 404,
        result: 'not found',
        message: 'record data not found'
      })
    }

    return res.json({
      code: 200,
      result: 'success',
      message: 'success get record data',
      data: ratings
    })
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      result: 'bad request',
      message: err.message
    })
  }
}

export const createRating = async (req: Request, res: Response) => {
  try {
    const rating = await createRatingService(req.user, req.body);

    return res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: rating
    })
  } catch (err: any) {
    if(err instanceof ValidationErrorAdapter) {
      return res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      })
    } else {
      return res.status(500).json({
        code: 500,
        result: 'internal server error',
        message: err.message
      })
    }
  }
}