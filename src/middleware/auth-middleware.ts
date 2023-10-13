import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload | string
    }
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]

  if(!token) return res.status(401).json({
    code: 404,
    result: 'unauthorized',
    message: 'token does not provided'
  })

  jwt.verify(token, process.env.SECRET_TOKEN as jwt.Secret, (err, decoded) => {
    if(err) return res.status(403).json({
      code: 403,
      result: 'forbidden',
      message: 'invalid token or token already expired'
    })

    req.user = decoded
    return next()
  })
}