import { Request, Response } from "express";
import loginService from "../services/admin/login-service";
import createService, { CreateAdminError } from "../services/admin/create-service";
import deleteService from "../services/admin/delete-service";
import updateService from "../services/admin/update-service";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    await createService(req.body)

    return res.json({
      code: 200,
      result: 'success',
      message: 'record has been created'
    })
  } catch (err) {
    if(err instanceof CreateAdminError) {
      return res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      })
    }

    const error: Error = err as Error
    return res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: error.message
    })
  }
}

export const loginAdmin = async (req: Request, res: Response) => {
    try {
      const admin = await loginService(req.body)

      if (!admin) return res.status(400).json({
        code: 404,
        status: 'not found',
        message: 'cannot retrieved data admin'
      });

      return res.json({
        code: 200,
        status: 'success',
        message: 'login message',
        data: {
          token: admin
        }
      })
    } catch (err: any) {
      return res.status(500).json({
          code: 500,
          status: 'internal server error',
          message: err.message
      })
    }
}

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const adminUpdated = await updateService(req.body, Object(req.params));

    if (!adminUpdated) return res.status(400).json({
      code: 400,
      status: 'error',
      message: 'Failed to update record'
    });

    return res.json({
      code: 200,
      status: 'success',
      message: 'Success to update record',
      data : adminUpdated
    });

  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      status: 'internal server error',
      message: err.message
    })
  }
}

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const adminCreated = await deleteService(Object(req.params));

    if (!adminCreated) return res.status(400).json({
      code: 400,
      status: 'error',
      message: 'Failed to delete record'
    });

    return res.json({
      code: 200,
      status: 'success',
      message: 'Success to delete record',
    });

  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      status: 'internal server error',
      message: err.message
    })
  }
}