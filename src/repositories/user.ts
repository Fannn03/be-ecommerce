import { PrismaClient } from "@prisma/client"
import { ulid } from 'ulid'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

interface UserInterface {
  id?: string,
  email: string,
  name: string,
  password: string,
}

interface UpdateUser {
  id    : string,
  email : string,
  name  : string
}

export const insertUser = async (request: UserInterface) => {
  try {
    return await prisma.user.create({
      data: {
        id: ulid(),
        email: request.email,
        name: request.name,
        password: request.password
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

export const updateUser = async (request: UpdateUser) => {
  try {
    return await prisma.user.update({
      data: {
        email: request.email,
        name: request.name
      },
      where: {
        id: request.id
      }
    })
  } catch (err) {
    throw err
  }
}