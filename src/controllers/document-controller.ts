import { Request, Response } from "express";

export const createDocument = async (req: Request, res: Response) => {

  return res.send("document");

}