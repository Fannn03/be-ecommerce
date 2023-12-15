import { countAddress, findAddress } from "@domain/repositories/address";
import { UserJWT } from "@middleware/auth-middleware";
import { Address } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

export default async (user: JwtPayload | UserJWT, query: any ) => {
  const take = Number(query.take) || 10;
  const skip = (Number(query.page) * take) - take || 0;

  const address = await findAddress({
    userId: user.id,
    take: take,
    skip: skip
  })

  const addressCount = await countAddress({
    query: [ {user_id: user.id} ]
  });
  const mapAddress = address.map((data: Address) => ({
    name: data.name,
    phone: data.phone,
    street: data.street,
    zip_code: data.zip_code,
    village: data.village,
    district: data.district,
    regency: data.regency,
    province: data.province,
    latitud: data.latitude,
    longitude: data.longitude
  }))

  const response = {
    address: mapAddress,
    pages: {
      size: address.length,
      total: addressCount,
      totalPages: Math.ceil(addressCount / take)
    }
  }

  return response;
}