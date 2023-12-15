import { PrismaClient } from "@prisma/client";
import { createDocumentInterface } from "@domain/models/interfaces/document.interface";

const prisma = new PrismaClient();

export const insertDocument = async (body: createDocumentInterface) => {
  try {
    return await prisma.document.create({
      data: {
        user_id: body.user_id,
        fullname: body.fullname,
        nik: body.nik,
        photos: body.photos,
      }
    })
  } catch (err) {
    throw err
  }
}