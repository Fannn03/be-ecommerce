import { PrismaClient } from "@prisma/client"

interface documentInterface {
  user_id   :   string,
  fullname  :   string,
  nik       :   string,
  photos    :   string
}

const prisma = new PrismaClient()

export const insertDocument = async (request: documentInterface) => {
  try {
    return await prisma.document.create({
      data: {
        user_id: request.user_id,
        fullname: request.fullname,
        nik: request.nik,
        photos: request.photos,
      }
    })
  } catch (err) {
    throw err
  }
}