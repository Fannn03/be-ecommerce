import { PrismaClient } from "@prisma/client"
import { ulid } from 'ulid'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

interface UserInterface {
  id?: string,
  email: string,
  name: string,
  password: string
}

export const insertUser = async (request: UserInterface) => {
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

export const verifyUser = async (id: string) => {
  try {
    await prisma.user.update({
      data: {
        email_verified: new Date().toISOString()
      },
      where: {
        id: id
      }
    });
  } catch (err) {
    throw err;
  }
}

export const updateUser = async (request: any) => {
  try {
    await prisma.user.update({
      data: request,
      where: {
        id: request.id
      }
    })
  } catch (err) {
    throw err
  }
}