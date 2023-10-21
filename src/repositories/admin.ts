import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

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