import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from 'bcrypt'
import { getUser } from "../../repositories/user"

interface LoginBody {
  email: string,
  password: string | undefined
}

interface Response {
  id: string,
  name: string,
  token: string
}

export class LoginError{
  constructor (public message: string, public code: number, public result: string) {
    this.message = message
    this.code = code
    this.result = result
  }
}

export default async (request: LoginBody) => {
  const user = await getUser(request.email);
  if(!user) return null;

  const payload = {
    id: user.id,
    name: user.name
  }
  try {
    const verifyPassword = await bcrypt.compare(request.password as string || "", user.password);
    if(!verifyPassword) return null;

    // check if email user isn't verified
    if(!user.email_verified) return new LoginError("Email must be verified first!", 403, 'forbidden')

    const response: Response = {
      id: user.id,
      name: user.name,
      token: jwt.sign(payload, process.env.SECRET_TOKEN as string, {expiresIn: '3h'})
    }

    return response
  } catch (err) {
    if(err instanceof Error) return err
  }
}