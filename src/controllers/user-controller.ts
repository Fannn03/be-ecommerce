import { Request, Response } from "express";
import registerService, { UserRegisterError } from "../services/user/register-service";
import loginService, { LoginError } from "../services/user/login-service";
import verifyEmailService, { VerifyEmailError } from "../services/user/verify-email-service";
import updateService, { UserUpdateError } from "../services/user/update-service";
import detailsService from "../services/user/details-service";
import loggerResponse from "../helpers/server/logger-response";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userRegister = await registerService(req.body);

    res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: userRegister
    });

    return loggerResponse({
      req: req,
      res: res
    })
  } catch (err: any) {
    if (err instanceof UserRegisterError) {
      res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      });

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
        error_message: err
      })
    }
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const data = await loginService(req.body);

  // TODO: refactor error message
  if(data instanceof LoginError) {
    res.status(data.code).json({
      code: data.code,
      result: data.result,
      message: data.message
    });

    return loggerResponse({
      req: req,
      res: res,
      error_message: data.message
    })
  } else if (!data) {
    res.status(404).json({
      code: 404,
      result: 'not found',
      message: 'cannot retrieve data user'
    })

    return loggerResponse({
      req: req,
      res: res
    });
  }
  else if(data instanceof Error) {
    res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: data.message
    })

    return loggerResponse({
      req: req,
      res: res,
      error_message: data.message
    });
  };

  res.json({
    code: 200,
    result: 'success',
    message: 'login success',
    data: data
  });

  return loggerResponse({
    req: req,
    res: res
  })
}

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    await verifyEmailService(req.query)

    res.json({
      code: 200,
      result: 'success',
      message: 'success verif email'
    });

    return loggerResponse({
      req: req,
      res: res
    })
  } catch (err: any) {
    if(err instanceof VerifyEmailError) {
      res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      });

      return loggerResponse({
        req: req,
        res: res,
        error_message: err.message
      })
    }else {
      res.status(500).json({
        code: 500,
        result: 'internal server error',
        message: err.message
      });

      return loggerResponse({
        req: req,
        res: res,
        error_message: err.message
      })
    }
  }
}

export const detailsuser = async (req: Request, res: Response) => {
  const user = await detailsService(req.user)

  res.json({
    code: 200,
    result: 'success',
    message: 'success get data user',
    data: user
  })

  return loggerResponse({
    req: req,
    res: res
  })
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateService(req)

    res.json({
      code: 200,
      result: 'success',
      message: 'success update record data',
      data: updatedUser
    })

    return loggerResponse({
      req: req,
      res: res
    })
  } catch (err: any) {
    if(err instanceof UserUpdateError) {
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
    }
    else {
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