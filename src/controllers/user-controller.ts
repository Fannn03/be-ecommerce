import { Request, Response } from "express";
import registerService from "../services/user/register-service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import loginService, { LoginError } from "../services/user/login-service";
import verifyEmailService, { VerifyEmailError } from "../services/user/verify-email-service";
import updateService, { UserUpdateError } from "../services/user/update-service";
import detailsService from "../services/user/details-service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userRegister = await registerService(req.body);

    return res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: userRegister
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
      return res.status(400).json({
        code: 400,
        result: 'bad request',
        message: err.message
      });
    }
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const data = await loginService(req.body);

  // TODO: refactor error message
  if(data instanceof LoginError) return res.status(data.code).json({
    code: data.code,
    result: data.result,
    message: data.message
  });
  else if (!data) {
    return res.status(404).json({
      code: 404,
      result: 'not found',
      message: 'cannot retrieve data user'
    })
  }
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
    data: data
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

export const detailsuser = async (req: Request, res: Response) => {
  const user = await detailsService(req.user)

  return res.json({
    code: 200,
    result: 'success',
    message: 'success get data user',
    data: user
  })
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateService(req)

    return res.json({
      code: 200,
      result: 'success',
      message: 'success update record data',
      data: updatedUser
    })
  } catch (err) {
    if(err instanceof UserUpdateError) {
      return res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      })
    }
    else {
      const error: Error = err as Error
      return res.status(500).json({
        code: 500,
        result: 'internal server error',
        message: error.message
      })
    }
  }
}