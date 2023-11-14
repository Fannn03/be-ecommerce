import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import cache from '../../config/cache';
import { insertUser } from "../../repositories/user";
import { sendRegisterMail } from '../../helpers/email/send-email-register';

interface CreateBody {
  email     : string,
  name      : string,
  password  : string
}

interface Response {
  id        : String,
  name      : String,
  email     : String,
  createdAt : Date
}

export default async (request: CreateBody) => {
  try {
    const hashPassword = await bcrypt.hash(request.password, 10)

    const user = await insertUser({
      email: request.email,
      name: request.name,
      password: hashPassword
    });
    
    const uuid = uuidv4()
    cache.set(uuid, user.id, 15 * 60) // set cache expired in 15 minutes
    await sendRegisterMail(user.email, uuid) // send inbox mail to user

    const response: Response = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }
    return response
  } catch (err) {
    if(err instanceof PrismaClientKnownRequestError) {
      if(err.code === "P2002" && err.meta?.target === "users_email_key") {
        throw new Error("Email already taken")
      } else if (err.code === "P2002" && err.meta?.target === "users_name_key") {
        throw new Error("Name already taken")
      } else {
        throw err
      }
    }
  }
}