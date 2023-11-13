import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
  return res.json({
    message: "category"
  })
}