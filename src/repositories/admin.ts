import { AdminLevel, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface CreateAdmin {
  email: string,
  name: string,
  password: string,
  level: AdminLevel
}

export const getAdmin = async (request: string) => {
  return await prisma.admin.findFirst({
    where: {
      OR: [
        {email: request},
        {name: request}
      ]
    }
  })
}

export const createAdmin = async (request: CreateAdmin) => {
  try {
    await prisma.admin.create({
      data: {
        email: request.email,
        name: request.name,
        password: request.password,
        level: request.level
      }
    })
  } catch (err) {
    throw err
  }
}