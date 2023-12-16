import { Request, Response } from "express";
import registerService from "@services/user/register-service";
import loginService, { LoginError } from "@services/user/login-service";
import verifyEmailService from "@services/user/verify-email-service";
import updateService from "@services/user/update-service";
import detailsService from "@services/user/details-service";
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userRegister = await registerService(req.body);

    return res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: userRegister
    });
  } catch (err: any) {
    if (err instanceof ValidationErrorAdapter) {
      return res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      });
    } else {
      return res.status(500).json({
        code: 500,
        result: 'internal server error',
        message: err.message
      })
    }
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const data = await loginService(req.body);

  // TODO: refactor error message
  if(data instanceof LoginError) {
    return res.status(data.code).json({
      code: data.code,
      result: data.result,
      message: data.message
    });
  } else if (!data) {
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

    return res.json({
      code: 200,
      result: 'success',
      message: 'success verif email'
    });
  } catch (err: any) {
    if(err instanceof ValidationErrorAdapter) {
      return res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      });
    }else {
      return res.status(500).json({
        code: 500,
        result: 'internal server error',
        message: err.message
      });
    }
  }
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

  } catch (err: any) {
    if(err instanceof ValidationErrorAdapter) {
      return res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      })
    }
    else {
      return res.status(500).json({
        code: 500,
        result: 'internal server error',
        message: err.message
      })
    }
  }
}