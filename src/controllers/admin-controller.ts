import { Request, Response } from "express";
import loginService from "../services/admin/login-service";
import createService from "../services/admin/create-service";

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

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const adminCreated = await createService(req.body);

        if (!adminCreated) return res.status(400).json({
            code: 400,
            status: 'error',
            message: 'Failed to create record'
        });

        return res.json({
            code: 200,
            status: 'success',
            message: 'Success to create record',
            data : adminCreated
        });

    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: 'internal server error',
            message: err.message
        })
    }
}