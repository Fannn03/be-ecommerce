import { PrismaClient } from "@prisma/client";
import { ulid } from 'ulid';
import { createUserInterface, updateUserInterface } from "@domain/models/interfaces/user.interface";

const prisma = new PrismaClient();

export const insertUser = async (body: createUserInterface) => {
  try {
    return await prisma.user.create({
      data: {
        id: ulid(),
        email: body.email,
        name: body.name,
        password: body.password
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
    return await prisma.user.update({
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

export const updateUser = async (request: updateUserInterface) => {
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