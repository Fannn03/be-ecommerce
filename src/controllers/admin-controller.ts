import { Request, Response } from "express";
import loginService from "../services/admin/login-service";
import createService, { CreateAdminError } from "../services/admin/create-service";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    await createService(req)

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

    if(!admin) return res.status(400).json({
      code: 404,
      status: 'not found',
      message: 'cannot retrieved data admin'
    });

    return res.json({
      code: 200,
      status: 'success',
      message: 'login message',
      data : admin
    })
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      status: 'internal server error',
      message: err.message
    })
  }
}