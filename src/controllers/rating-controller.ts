import { Request, Response } from "express";
import createRatingService, { CreateRatingError } from '@services/rating/create-service';
import findAllRatingService from '@services/rating/findall-service';
import loggerResponse from "@helpers/server/logger-response";

export const findAllRating = async (req: Request, res: Response) => {
  try {
    const ratings = await findAllRatingService(req.params.slug, req.query);
    if(!ratings || (!ratings?.comment.length && req.query.page)) {
      res.status(404).json({
        code: 404,
        result: 'not found',
        message: 'record data not found'
      })

      return loggerResponse({
        req: req,
        res: res
      })
    }

    res.json({
      code: 200,
      result: 'success',
      message: 'success get record data',
      data: ratings
    })

    return loggerResponse({
      req: req,
      res: res
    })
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      result: 'bad request',
      message: err.message
    })

    return loggerResponse({
      req: req,
      res: res,
      error_message: err.message
    })
  }
}

export const createRating = async (req: Request, res: Response) => {
  try {
    const rating = await createRatingService(req.user, req.body);

    res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: rating
    })

    return loggerResponse({
      req: req,
      res: res
    })
  } catch (err: any) {
    if(err instanceof CreateRatingError) {
      res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      })

      return loggerResponse({
        req: req,
        res: res,
        error_message: err.message
      })
    } else {
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
  }
}