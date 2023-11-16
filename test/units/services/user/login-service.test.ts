import { faker } from '@faker-js/faker'
import { PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import login, { LoginError } from '../../../../src/services/user/login-service'
import { ulid } from 'ulid'

const prisma = new PrismaClient()

describe("User Login Service", () => {
  let user: User

  beforeAll(async () => {

    user = await prisma.user.create({
      data: {
        id: ulid(),
        email: faker.internet.email(),
        name: faker.internet.userName(),
        password: await bcrypt.hash('password', 10)
      }
    })
  })

  test("Should return null when email is not found", async () => {
    const payload = {
      email: "randomEmail",
      password: "password"
    }

    const response = await login(payload)
    expect(response).toBeNull()
  })

  test("Should return null when password value is sting null", async () => {
    const payload = {
      email: user.email,
      password: ""
    }

    const response = await login(payload)
    expect(response).toBeNull()
  })

  test("Should return LoginError class when email is not verified", async () => {
    const payload = {
      email: user.email,
      password: "password"
    }

    try {
      await login(payload)
    } catch (err: any) {
      expect(err.message).toBe("Email must be verified first!")
      expect(err.code).toEqual(403)
      expect(err.result).toBe("forbidden")
    }
  })

  test("Should return property response when login success", async () => {
    // pretend that this session user email already activated
    user = await prisma.user.update({
      data: {
        email_verified: new Date().toISOString()
      },
      where: {
        email: user.email
      }
    })

    const payload = {
      email: user.email,
      password: "password"
    }

    const response = await login(payload)
    expect(response).toHaveProperty("id")
    expect(response).toHaveProperty("name")
    expect(response).toHaveProperty("token")
  })
})