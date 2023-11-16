import { PrismaClient, User } from "@prisma/client"
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { ulid } from "ulid"
import verifyEmail from "../../../../src/services/user/verify-email-service"
import cache from "../../../../src/config/cache"

describe("User Verify Service", () => {
  const prisma = new PrismaClient()
  let user: User

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        id: ulid(),
        email: faker.internet.email(),
        name: faker.internet.userName(),
        password: await bcrypt.hash("password", 10)
      }
    })
  })

  test("Should return error when params key does not provided", async () => {
    const payload = {

    }

    try {
      await verifyEmail(payload)
    } catch (err: any) {
      expect(err.message).toBe("params key does not provided")
      expect(err.code).toEqual(400)
      expect(err.result).toBe("bad request")
    }
  })

  test("Should return error when key already expired or invalid key", async () => {
    const payload = {
      key: "randomKeyThatExpiredOrInvalid"
    }

    try {
      await verifyEmail(payload)
    } catch (err: any) {
      expect(err.message).toBe("Invalid key or key already expired")
      expect(err.code).toEqual(400)
      expect(err.result).toBe("bad request")
    }
  })
  
  test("Should return success when verify email is success", async () => {
    const uuid = uuidv4()
    cache.set(uuid, user.id, 15 * 60)
    const payload = {
      key: uuid
    }

    try {
      const test = await verifyEmail(payload)
      
      expect(test).toHaveProperty("id")
      expect(test).toHaveProperty("email")
      expect(test).toHaveProperty("email_verified_at")
      expect(test).toHaveProperty("updatedAt")
    } catch (err: any) {
      console.log(err)
    }
  })
})