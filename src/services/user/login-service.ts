import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from 'bcrypt'
import { getUser } from "../../repositories/user"

interface LoginBody {
  email: string,
  password: string | undefined
}

export class LoginError extends Error {
  constructor (message: string, public code: number, public result: string) {
    super()
    this.message = message
    this.code = code
    this.result = result
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export default async (request: LoginBody) => {
  const user = await getUser(request.email);
  if(!user) return null;

  const payload = {
    id: user.id,
  }
  try {
    const verifyPassword = await bcrypt.compare(request.password as string, user.password);
    if(!verifyPassword) return null;

    // check if email user isn't verified
    if(!user.email_verified) throw new LoginError("Email must be verified first!", 403, 'forbidden')

    return jwt.sign(payload, process.env.SECRET_TOKEN as string, {expiresIn: '3h'});
  } catch (err) {
    if(err instanceof Error) return err
  }
}