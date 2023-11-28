import { Request, Response } from "express";

export const createCart = async (req: Request, res: Response) => {
  return res.send('cart');
}