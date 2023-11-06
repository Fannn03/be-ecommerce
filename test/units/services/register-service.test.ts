import { faker } from '@faker-js/faker'
import register from '../../../src/services/user/register-service'

describe("User Register Service", () => {
  test("Should return data when register success", async () => {
    const payload = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: "password"
    }

    const response = await register(payload)

    expect(response).toHaveProperty("id")
    expect(response).toHaveProperty("name")
    expect(response).toHaveProperty("email")
    expect(response).toHaveProperty("createdAt")
  })
})