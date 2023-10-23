import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { createAdmin } from "../../repositories/admin"

export class CreateAdminError extends Error {
  constructor(public message: string, public code: number, public result: string) {
    super()
    this.message = message
    this.code = code
    this.result = result
  }
}

export default async (req: any) => {
  if(req.user.level == 'admin' && (req.body.level == "admin" || req.body.level == "superadmin")) {
    throw new CreateAdminError("You don't have any permission to use this level", 403, "forbidden")
  }

  if(req.user.level == 'cs') {
    throw new CreateAdminError("You don't have any permission to use this level", 403, "forbidden")
  }

  try {
    await createAdmin({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      level: req.body.level
    })
  } catch (err) {
    if(err instanceof PrismaClientKnownRequestError) {
      if(err.code == "P2002" && err.meta?.target == 'admins_email_key') {
        throw new CreateAdminError("Email already taken", 400, "bad request")
      }

      if(err.code == "P2002" && err.meta?.target == "admins_name_key") {
        throw new CreateAdminError("Name already taken", 400, "bad request")
      }
    }
    
    throw err
  }
}