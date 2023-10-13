import { Request, Response } from "express";
import registerService from "../services/user/register-service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import loginService from "../services/user/login-service";
import verifyEmailService, { VerifyEmailError } from "../services/user/verify-email-service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    await registerService(req.body);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
      return res.status(400).json({
        code: 400,
        result: 'bad request',
        message: err.message
      });
    }
  }

  return res.json({
    code: 200,
    result: 'success',
    message: 'record has been created'
  });
}

export const loginUser = async (req: Request, res: Response) => {
  const data = await loginService(req.body);

  if(!data) return res.status(404).json({
    code: 404,
    result: 'not found',
    message: 'cannot retrieve data user'
  });
  else if(data instanceof Error) {
    return res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: data.message
    })
  };

  return res.json({
    code: 200,
    result: 'success',
    message: 'login success',
    data: {
      token: data
    }
  });
}

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    await verifyEmailService(req.query)
  } catch (err) {
    if(err instanceof VerifyEmailError) {
      return res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      });
    }else {
      const error: Error = err as Error;
      return res.status(500).json({
        code: 500,
        result: 'internal server error',
        message: error.message
      });
    }
  }

  return res.json({
    code: 200,
    result: 'success',
    message: 'success verif email'
  });
}