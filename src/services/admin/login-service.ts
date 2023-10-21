import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { getAdmin } from "../../repositories/admin";

interface LoginBody {
  name: string,
  password: string
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

    return jwt.sign(payload, process.env.SECRET_TOKEN as string, {expiresIn: '3h'})
  } catch (err) {
    return err
  }
}