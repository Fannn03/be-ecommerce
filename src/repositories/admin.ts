import { AdminLevel, PrismaClient } from "@prisma/client"
import dayjs from "dayjs";

const prisma = new PrismaClient()

interface adminInterface {
  name      : string;
  email     : string;
  password  : string; 
  level     : AdminLevel;
}
interface updateInterface {
  name      : string;
  email     : string;
  password? : string; 
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

  const now = dayjs().toISOString();

  return await prisma.admin.create({
    data: {
      name      : data.name,
      email     : data.email,
      password  : data.password, 
      level     : data.level,
      createdAt : now
    }
  })
}

export const updateAdmin  = async (data: updateInterface, id : number)  => {

  return await prisma.admin.update({
    where : {
      id: id,
      deletedAt: null
    },
    data: data
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