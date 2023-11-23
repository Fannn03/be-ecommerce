import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { AdminLevel } from '@prisma/client'
import 'dotenv/config'

export interface UserJWT {
  id      : string,
  name    : string,
  level?  : AdminLevel,
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | UserJWT
    }
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]

  if(!token) return res.status(401).json({
    code: 401,
    result: 'unauthorized',
    message: 'token does not provided'
  })

  jwt.verify(token, process.env.SECRET_TOKEN as jwt.Secret, (err, decoded) => {
    if(err) return res.status(403).json({
      code: 403,
      result: 'forbidden',
      message: 'invalid token or token already expired'
    }) 

    req.user = decoded as JwtPayload
    return next()
  })
}

export const allowedLevels = (levels: AdminLevel[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if(!levels.includes(req.user.level)) return res.status(403).json({
      code: 403,
      result: 'forbidden',
      message: "You don't have permission to access this route"
    })

    return next()
  }
}