import { PrismaClient } from "@prisma/client";
import { createAdminInterface, updateAdminInterface } from "@domain/models/interfaces/admin.interface";

const prisma = new PrismaClient()

export const getAdmin = async (params: string) => {
  return await prisma.admin.findFirst({
    where: {
      OR: [
        {email: params},
        {name: params}
      ]
    }
  })
}

export const createAdmin  = async (body: createAdminInterface)  => {
  try {
    return await prisma.admin.create({
      data: {
        name      : body.name,
        email     : body.email,
        password  : body.password, 
        level     : body.level
      }
    })
  } catch (err) {
    throw err
  }
}

export const updateAdmin  = async (body: updateAdminInterface, id: number)  => {
  return await prisma.admin.update({
    where : {
      id: id,
      deletedAt: null
    },
    data: body
  })
}

export const deleteAdmin  = async (id: number)  => {
  const now = new Date().toISOString();

  return await prisma.admin.update({
    where: {
      id: id
    },
    data: {
      deletedAt: now
    }
  })
}