import { Request, Response } from "express";
import registerService from "../services/user/register-service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const registerUser = async (req: Request, res: Response) => {
  try {
    await registerService(req.body);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
      return res.status(400).json({
        code: 400,
        result: 'bad request',
        message: err.message
      })
    }
  }

  return res.json({
    code: 200,
    result: 'success',
    message: 'record has been created'
  })
}