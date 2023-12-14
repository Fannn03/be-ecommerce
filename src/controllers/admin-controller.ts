import { Request, Response } from "express";
import loginService from "@services/admin/login-service";
import createService from "@services/admin/create-service";
import deleteService from "@services/admin/delete-service";
import updateService from "@services/admin/update-service";
import loggerResponseAdapter from "@common/adapters/server/logger-response.adapter";
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const adminRegister = await createService(req.body)

    res.json({
      code: 200,
      result: 'success',
      message: 'record has been created',
      data: adminRegister
    })

    return loggerResponseAdapter({
      req: req,
      res: res
    })
  } catch (err: any) {
    if(err instanceof ValidationErrorAdapter) {
      res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      })

      return loggerResponseAdapter({
        req: req,
        res: res,
        error_message: err.message
      })
    }

    res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: err.message
    })

    return loggerResponseAdapter({
      req: req,
      res: res,
      error_message: err.message
    })
  }
}

export const loginAdmin = async (req: Request, res: Response) => {
    try {
      const admin = await loginService(req.body)

      if (!admin) {
        res.status(400).json({
          code: 404,
          status: 'not found',
          message: 'cannot retrieved data admin'
        });

        return loggerResponseAdapter({
          req: req,
          res: res,
        })
      }

      res.json({
        code: 200,
        status: 'success',
        message: 'login message',
        data: {
          token: admin
        }
      })

      return loggerResponseAdapter({
        req: req,
        res: res,
      })
    } catch (err: any) {
      res.status(500).json({
          code: 500,
          status: 'internal server error',
          message: err.message
      })

      return loggerResponseAdapter({
        req: req,
        res: res,
        error_message: err.message
      })
    }
}

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const adminUpdated = await updateService(req.body, Object(req.params));

    if (!adminUpdated) {
      res.status(400).json({
        code: 400,
        status: 'error',
        message: 'Failed to update record'
      });

      return loggerResponseAdapter({
        req: req,
        res: res
      })
    }

    res.json({
      code: 200,
      status: 'success',
      message: 'Success to update record',
      data : adminUpdated
    });

    return loggerResponseAdapter({
      req: req,
      res: res
    })
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      status: 'internal server error',
      message: err.message
    })

    return loggerResponseAdapter({
      req: req,
      res: res,
      error_message: err.message
    })
  }
}

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const adminCreated = await deleteService(Object(req.params));

    if (!adminCreated) {
      res.status(400).json({
        code: 400,
        status: 'error',
        message: 'Failed to delete record'
      });

      return loggerResponseAdapter({
        req: req,
        res: res
      })
    }

    res.json({
      code: 200,
      status: 'success',
      message: 'Success to delete record',
    });
    
    return loggerResponseAdapter({
      req: req,
      res: res,
    })
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      status: 'internal server error',
      message: err.message
    })

    return loggerResponseAdapter({
      req: req,
      res: res,
      error_message: err.message
    })
  }
}