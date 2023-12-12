import { Request, Response } from "express";
import moment from "moment";
import { models } from '../../models/index';

interface loggerInterface {
  req: Request,
  res: Response,
  username?: String,
  error_message?: any
}

moment.locale('id');

export default async (params: loggerInterface) => {
  const {req, res, username, error_message} = params
  const Response = models.response;

  if(req.body.password) req.body.password = "*****";
  if(req.body.phone) req.body.phone = "***";

  const response = new Response({
    url: req.originalUrl,
    method: req.method,
    statusCode: res.statusCode,
    ip: req.ip,
    user_agent: req.get('User-Agent'),
    params: req.params,
    query: req.query,
    body: req.body,
    username: username,
    error_message: error_message,
    date: moment().format("dddd, Do MMMM YYYY | H:mm:ss")
  });

  return await response.save();
}