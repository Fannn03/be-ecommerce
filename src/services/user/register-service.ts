import { v4 as uuidv4 } from 'uuid'
import { sendRegisterMail } from "../../repositories/mail";
import { insertUser } from "../../repositories/user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import cache from '../../config/cache';

export interface RegisterBody {
  email: string,
  name: string,
  password: string
}

export default async (request: RegisterBody) => {
  try {
    const user = await insertUser(request);
    const uuid = uuidv4()

    cache.set(uuid, user.id, 15 * 60) // set cache expired in 15 minutes
    await sendRegisterMail(user.email, uuid) // send inbox mail to user
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