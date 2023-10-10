import { PrismaClient } from "@prisma/client"
import { ulid } from 'ulid'
import bcrypt from 'bcrypt'
import { RegisterBody } from "../services/user/register-service";
const prisma = new PrismaClient()

export const insertUser = async (request: RegisterBody) => {
  try {
    await prisma.user.create({
      data: {
        id: ulid(),
        email: request.email,
        name: request.name,
        password: await bcrypt.hash(request.password, 10)
      }
    });
  } catch (err) {
    throw err
  }
}