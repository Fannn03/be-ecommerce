import { AdminLevel, PrismaClient } from "@prisma/client"
import dayjs from "dayjs";

const prisma = new PrismaClient()

interface adminInterface {
  name      : string;
  email     : string;
  password  : string; 
  level     : AdminLevel;
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

export const createAdmin  = async (data: adminInterface)  => {

  return await prisma.admin.create({
    data: {
      name      : data.name,
      email     : data.email,
      password  : data.password, 
      level     : data.level
    }
  })
}

export const updateAdmin  = async (id : number, data: adminInterface)  => {

  return await prisma.admin.update({
    where : {
      id: id
    },
    data: {
      name      : data.name,
      email     : data.email,
      password  : data.password, 
      level     : data.level
    }
  })
}

export const deleteAdmin  = async (id : number)  => {

  const now = dayjs().toISOString();

  return await prisma.admin.update({
    where: {
      id: id
    },
    data: {
      deletedAt: now
    }
  })
}

