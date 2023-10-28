import bcrypt from 'bcrypt'
import 'dotenv/config'
import { updateAdmin } from "../../repositories/admin";
import { AdminLevel } from '@prisma/client';

interface body {
  name: string;
  email: string;
  password?: string;
  level: AdminLevel;
}

interface requestParams {
  id: string;
}

interface Response {
  id        : number;
  name      : string;
  email     : string;
  level     : AdminLevel;
  updatedAt : Date;
}

export default async (body: body, params: requestParams) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const payload : body  = {
      name      : body.name,
      email     : body.email,
      level     : body.level
    };

    if(body.password != null) payload.password = bcrypt.hashSync(body.password, salt);

    const adminUpdated = await updateAdmin(payload, Number(params.id));

    if (!adminUpdated) return null

    const response: Response = {
      id: adminUpdated.id,
      name: adminUpdated.name,
      email: adminUpdated.email,
      level: adminUpdated.level,
      updatedAt: adminUpdated.updatedAt
    }

    return response
  } catch (err) {
    return err
  }
}