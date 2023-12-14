import { PrismaClient } from "@prisma/client";
import { createAdrressInterface, findAddressInterface } from "@domain/interfaces/address.interface";

const prisma = new PrismaClient();

export const findAddress = async (params: findAddressInterface) => {
  return await prisma.address.findMany({
    where: {
      user_id: params.userId,
      deletedAt: null,
      AND: params.query
    },
    skip: (params.skip) ? params.skip : undefined,
    take: (params.take) ? params.take : undefined,
  })
}

export const createAddress = async (body: createAdrressInterface) => {
  try {
    return await prisma.address.create({
      data: {
       user_id: body.user_id,
       name: body.name,
       phone: body.phone,
       street: body.street,
       zip_code: body.zip_code,
       village: body.village,
       district: body.district,
       regency: body.regency,
       province: body.province,
       latitude: body.latitude,
       longitude: body.longitude
      }
    })
  } catch (err) {
    throw err;
  }
}