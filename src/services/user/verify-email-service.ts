import { ParsedQs } from "qs"
import { Key } from "node-cache"
import cache from "@config/cache"
import { verifyUser } from "@domain/repositories/user"
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter"

export default async (req: ParsedQs) => {
  if(!req.key) throw new ValidationErrorAdapter("params key does not provided", 400, 'bad request')

  const getCache = cache.get(req.key as Key)
  if(!getCache) throw new ValidationErrorAdapter("Invalid key or key already expired", 400, 'bad request')

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