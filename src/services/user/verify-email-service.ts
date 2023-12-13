import { ParsedQs } from "qs"
import { Key } from "node-cache"
import cache from "@config/cache"
import { verifyUser } from "@domain/repositories/user"

export class VerifyEmailError{
  constructor(public message: string, public code:number, public result: string) {
    this.message = message
    this.code = code
    this.result = result
  }
}

export default async (req: ParsedQs) => {
  if(!req.key) throw new VerifyEmailError("params key does not provided", 400, 'bad request')

  const getCache = cache.get(req.key as Key)
  if(!getCache) throw new VerifyEmailError("Invalid key or key already expired", 400, 'bad request')

  try {
    const verify = await verifyUser(getCache as string)

    const response = {
      id: verify.id,
      email: verify.email,
      email_verified_at: verify.email_verified,
      updatedAt: verify.updatedAt
    }

    return response
  } catch (err) {
    throw err
  }
}