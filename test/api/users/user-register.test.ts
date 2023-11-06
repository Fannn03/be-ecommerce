import request from 'supertest'
import { faker } from '@faker-js/faker'
import app from '../../../src/app'

describe("User Register API", () => {
  let email: string, name: string

  // Create an account for testing duplicate email & name
  beforeAll(async () => {
    email = faker.internet.email()
    name = faker.internet.userName()

    const data = {
      email: email,
      name: name,
      password: "password"
    }

   await request(app).post('/users/register')
      .send(data)
  })

  test("Should return 200 when register success", async () => {
    const data = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: "password"
    }

    const response = await request(app).post('/users/register')
      .send(data)

    expect(response.statusCode).toEqual(200)
    expect(response.body.code).toEqual(200)
    expect(response.body.result).toBe("success")
    expect(response.body.message).toBe("record has been created")
  })

  test("Should return 400 when request body is null", async () => {
    const data = {

    }

    const responseMessage = {
      email: "\"email\" is required",
      name: "\"name\" is required",
      password: "\"password\" is required"
    }

    const response = await request(app).post('/users/register')
      .send(data)

    expect(response.statusCode).toEqual(400)
    expect(response.body.code).toEqual(400)
    expect(response.body.result).toBe("bad request")
    expect(response.body.message).toEqual(responseMessage)
  })

  test("Should return 400 when request body email is required", async () => {
    const data = {
      name: faker.internet.userName(),
      password: "password"
    }

    const responseMessage = {
      email: "\"email\" is required",
    }

    const response = await request(app).post('/users/register')
      .send(data)

    expect(response.statusCode).toEqual(400)
    expect(response.body.code).toEqual(400)
    expect(response.body.result).toBe("bad request")
    expect(response.body.message).toEqual(responseMessage)
  })

  test("Should return 400 when request body name is required", async () => {
    const data = {
      email: faker.internet.email(),
      password: "password"
    }

    const responseMessage = {
      name: "\"name\" is required",
    }

    const response = await request(app).post('/users/register')
      .send(data)

    expect(response.statusCode).toEqual(400)
    expect(response.body.code).toEqual(400)
    expect(response.body.result).toBe("bad request")
    expect(response.body.message).toEqual(responseMessage)
  })

  test("Should return 400 when request body password is required", async () => {
    const data = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
    }

    const responseMessage = {
      password: "\"password\" is required"
    }

    const response = await request(app).post('/users/register')
      .send(data)

    expect(response.statusCode).toEqual(400)
    expect(response.body.code).toEqual(400)
    expect(response.body.result).toBe("bad request")
    expect(response.body.message).toEqual(responseMessage)
  })

  test("Should return 400 when email is invalid", async () => {
    const data = {
      email: "myemail",
      name: faker.internet.userName(),
      password: "password"
    }

    const responseMessage = {
      email: "\"email\" must be a valid email"
    }

    const response = await request(app).post('/users/register')
      .send(data)

    expect(response.statusCode).toEqual(400)
    expect(response.body.code).toEqual(400)
    expect(response.body.result).toBe("bad request")
    expect(response.body.message).toEqual(responseMessage)
  })

  test("Should return 400 when name is contains whitespace", async () => {
    const data = {
      email: faker.internet.email(),
      name: "my username",
      password: "password"
    }

    const responseMessage = {
      name: "name cannot contains whitespace"
    }

    const response = await request(app).post('/users/register')
      .send(data)

    expect(response.statusCode).toEqual(400)
    expect(response.body.code).toEqual(400)
    expect(response.body.result).toBe("bad request")
    expect(response.body.message).toEqual(responseMessage)
  })

  test("Should return 400 when password is contains whitespace", async () => {
    const data = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: "my password"
    }

    const responseMessage = {
      password: "password cannot contains whitespace"
    }

    const response = await request(app).post('/users/register')
      .send(data)

    expect(response.statusCode).toEqual(400)
    expect(response.body.code).toEqual(400)
    expect(response.body.result).toBe("bad request")
    expect(response.body.message).toEqual(responseMessage)
  })

  test("Should return 400 when email already taken", async () => {
    const data = {
      email: email,
      name: faker.internet.userName(),
      password: "password"
    }

    const response = await request(app).post('/users/register')
      .send(data)

    expect(response.statusCode).toEqual(400)
    expect(response.body.code).toEqual(400)
    expect(response.body.result).toBe("bad request")
    expect(response.body.message).toEqual("Email already taken")
  })

  test("Should return 400 when name already taken", async () => {
    const data = {
      email: faker.internet.email(),
      name: name,
      password: "password"
    }

    const response = await request(app).post('/users/register')
      .send(data)

    expect(response.statusCode).toEqual(400)
    expect(response.body.code).toEqual(400)
    expect(response.body.result).toBe("bad request")
    expect(response.body.message).toEqual("Name already taken")
  })
})