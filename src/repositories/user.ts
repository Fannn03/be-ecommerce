import { PrismaClient } from "@prisma/client"
import { ulid } from 'ulid'
import bcrypt from 'bcrypt'
import { RegisterBody } from "../services/user/register-service";
const prisma = new PrismaClient()

export const insertUser = async (request: RegisterBody) => {
  try {
    return await prisma.user.create({
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

export const getUser = async (request: string) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        {id: request},
        {email: request},
        {name: request}
      ]
    }
  })
}