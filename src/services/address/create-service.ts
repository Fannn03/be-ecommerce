import { JwtPayload } from "jsonwebtoken";
import { UserJWT } from "../../middleware/auth-middleware";
import { createAddress } from "../../repositories/address";

export default async (user: JwtPayload | UserJWT, body: any) => {
  const { name, phone, street, zip_code, village, district, regency, province, latitude, longitude } = body;

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