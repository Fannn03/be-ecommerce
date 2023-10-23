import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { createAdmin, getAdmin } from "../../repositories/admin";
import { Admin, AdminLevel } from '@prisma/client';

interface createBody {
  name      : string;
  email     : string;
  password  : string;
  level     : AdminLevel;
}

interface Response {
  id      : number;
  name    : string;
  email   : string;
  level   : AdminLevel;
  createdAt: Date
}

export default async (req: createBody) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.password, salt);
    const adminCreated = await createAdmin({
        name      : req.name,
        email     : req.email,
        password  : password,
        level     : req.level
    });

    if(!adminCreated) return null

    const response : Response = {
      id: adminCreated.id,
      name: adminCreated.name,
      email: adminCreated.email,
      level: adminCreated.level,
      createdAt: adminCreated.createdAt
    }

    return response
  } catch (err) {
    return err
  }
}