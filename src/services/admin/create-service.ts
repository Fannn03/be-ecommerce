import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import bcrypt from 'bcrypt'
import { AdminLevel } from '@prisma/client';
import 'dotenv/config'
import { createAdmin } from "@domain/repositories/admin";
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";

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
    if(err instanceof PrismaClientKnownRequestError) {
      if(err.code == "P2002" && err.meta?.target == 'admins_email_key') {
        throw new ValidationErrorAdapter("Email already taken", 400, "bad request")
      }

      if(err.code == "P2002" && err.meta?.target == "admins_name_key") {
        throw new ValidationErrorAdapter("Name already taken", 400, "bad request")
      }
    }
    
    throw err
  }
}