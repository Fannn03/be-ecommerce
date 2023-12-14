import { JwtPayload } from "jsonwebtoken";
import { UserJWT } from "@middleware/auth-middleware";
import { createAddress, findAddress } from "@domain/repositories/address";
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";

export default async (user: JwtPayload | UserJWT, body: any) => {
  const { name, phone, street, zip_code, village, district, regency, province, latitude, longitude } = body;

  const duplicateAddress = await findAddress({
    userId: user.id,
    query: [
      { name: name, street: street, zip_code: Number(zip_code), village: village },
      { district: district, regency: regency, province: province } 
    ]
  });
  if(duplicateAddress.length) throw new ValidationErrorAdapter("This address seems already exist", 400, "bad request");

  try {
    const address = await createAddress({
      user_id: user.id,
      name: name,
      phone: phone,
      street: street,
      zip_code: Number(zip_code),
      village: village,
      district: district,
      regency: regency,
      province: province,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    })

    const response = {
      name: address.name,
      phone: address.phone,
      street: address.street,
      zip_code: address.zip_code,
      village: address.village,
      district: address.district,
      regency: address.regency,
      province: address.province,
      latitude: address.latitude,
      longitude: address.longitude
    }

    return response;
  } catch (err) {
    throw err;
  }
}