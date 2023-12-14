import { JwtPayload } from "jsonwebtoken";
import { getUser } from "@domain/repositories/user";

interface Response {
  id              : string | undefined,
  email           : string | undefined,
  name            : string | undefined,
  email_verified  : Date | null | undefined,
  createdAt       : Date | undefined,
  updatedAt       : Date | undefined,
  deletedAt       : Date | null | undefined
}

export default async (user: JwtPayload) => {
  const dataUser = await getUser(user.id)
  
  const response: Response | null = {
    id: dataUser?.id,
    email: dataUser?.email,
    name: dataUser?.name,
    email_verified: dataUser?.email_verified,
    createdAt: dataUser?.createdAt,
    updatedAt: dataUser?.updatedAt,
    deletedAt: dataUser?.deletedAt
  }

  return response
}