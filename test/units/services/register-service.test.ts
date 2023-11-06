import { faker } from '@faker-js/faker'
import register from '../../../src/services/user/register-service'

describe("User Register Service", () => {
  let email:string, name:string

  test("Should return property when register success", async () => {
    const payload = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: "password"
    }

    // assign variable email to validate duplicate data
    email = payload.email
    name = payload.name

    const response = await register(payload)

    expect(response).toHaveProperty("id")
    expect(response).toHaveProperty("name")
    expect(response).toHaveProperty("email")
    expect(response).toHaveProperty("createdAt")
  })

  test("Should return error message when duplicate value email", async () => {
    const payload = {
      email: email,
      name: faker.internet.userName(),
      password: "password"
    }

    try {
      await register(payload)
    } catch (err: any) {
      expect(err.message).toBe("Email already taken")
    }
  })

  test("Should return error message when duplicate value name", async () => {
    const payload = {
      email: faker.internet.email(),
      name: name,
      password: "password"
    }

    try {
      await register(payload)
    } catch (err: any) {
      expect(err.message).toBe("Name already taken")
    }
  })
})