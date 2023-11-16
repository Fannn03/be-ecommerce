import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  return res.json({
    message: 'create product'
  })
}