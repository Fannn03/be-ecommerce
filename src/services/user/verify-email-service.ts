import { ParsedQs } from "qs"
import { Key } from "node-cache"
import cache from "../../config/cache"
import { verifyUser } from "../../repositories/user"

export class VerifyEmailError extends Error {
  constructor(message: string, public code:number, public result: string) {
    super()
    this.message = message
    this.code = code
    this.result = result
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default async (req: ParsedQs) => {
  if(!req.key) throw new VerifyEmailError("params key does not provided", 400, 'bad request')

  const getCache = cache.get(req.key as Key)
  if(!getCache) throw new VerifyEmailError("Invalid key or key already expired", 400, 'bad request')

  try {
    await verifyUser(getCache as string)
  } catch (err) {
    throw err
  }
}