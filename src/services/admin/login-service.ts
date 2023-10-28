import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { getAdmin } from "../../repositories/admin";

interface LoginBody {
  name: string,
  password: string
}

interface Response {
  id: number,
  name: string,
  level: string,
  token: string
}

export default async (req: LoginBody) => {
  try {
    const admin = await getAdmin(req.name)
    
    if(!admin) return null

    const validatePassword = await bcrypt.compare(req.password || '', admin.password)
    if(!validatePassword) return null

    const payload = {
      id: admin.id,
      level: admin.level
    }

    const response: Response = {
      id: admin.id,
      name: admin.name,
      level: admin.level,
      token: jwt.sign(payload, process.env.SECRET_TOKEN as string, {expiresIn: '3h'})
    }

    return response
  } catch (err) {
    return err
  }
}