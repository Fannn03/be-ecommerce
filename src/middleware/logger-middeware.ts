import { NextFunction, Request, Response } from "express"
import loggerResponseAdapter from "@common/adapters/server/logger-response.adapter";

interface loggerPayload {
  req: Request,
  res: Response,
  error_message?: string
}

/**
 *  Reference source stackoverflow
 *  https://stackoverflow.com/questions/19215042/express-logging-response-body/58882269#58882269
**/

export default async (req: Request, res: Response, next: NextFunction) => {
  const [oldWrite, oldEnd] = [res.write, res.end];
    const chunks: Buffer[] = [];

    (res.write as unknown) = function(chunk: any) {
      chunks.push(Buffer.from(chunk));
      (oldWrite as Function).apply(res, arguments);
    };

    res.end = function(chunk: any): any {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }
      const body = Buffer.concat(chunks).toString('utf8');      
      const convertToJson = JSON.parse(body);
      const payload: loggerPayload = {
        req: req,
        res: res
      } 

      if(res.statusCode != 200) payload.error_message = convertToJson.message;
      loggerResponseAdapter(payload);

      (oldEnd as Function).apply(res, arguments);
    };
  
  next();
}