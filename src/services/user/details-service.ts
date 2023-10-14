import { JwtPayload } from "jsonwebtoken";
import { getUser } from "../../repositories/user";

interface DataUser {
  id: string,
  email: string,
  name: string,
  password?: string,
  email_verified: Date | null,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date | null
}

export default async (user: JwtPayload) => {
  const dataUser: DataUser | null = await getUser(user.id)
  delete dataUser?.password

  return dataUser
}