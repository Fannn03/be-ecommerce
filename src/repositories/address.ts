import { PrismaClient } from "@prisma/client"

interface createAddressInterface {
  user_id    :  string,
  name       :  string,
  phone      :  string,
  street     :  string,
  zip_code   :  number,
  village    :  string,
  district   :  string,
  regency    :  string,
  province   :  string,
  latitude   :  number,
  longitude  :  number
}

const prisma = new PrismaClient();

export const createAddress = async (body: createAddressInterface) => {
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