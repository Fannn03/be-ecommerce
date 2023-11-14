import { PrismaClient } from "@prisma/client"
import promptSync from 'prompt-sync'
import { faker } from '@faker-js/faker/locale/id_ID'
import { ulid } from 'ulid'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient
const prompt = promptSync()

export default {
  name: 'user',
  run: async () => {
    const number = prompt("How many user do you want to create ? : ")
    if(!Number(number)) throw new Error("Invalid value number")

    console.log("seeding user...");
    
    for(let i = 0; i < Number(number); i++) {
      const isVerified: boolean = faker.datatype.boolean({
        probability: 0.5
      })

      const isDeleted: boolean = faker.datatype.boolean({
        probability: 0.3
      })

      const createdAt: Date[] = faker.date.betweens({
        from: "2019-01-01T06:34:30.000Z",
        to: "2023-01-09T06:34:30.000Z"
      })

      const verifiedAt: Date[] = faker.date.betweens({
        from: createdAt[0],
        to: "2023-01-09T06:34:30.000Z"
      })

      const updatedAt: Date[] = faker.date.betweens({
        from: verifiedAt[0],
        to: "2023-01-09T06:34:30.000Z"
      })

      const deletedAt: Date[] = faker.date.betweens({
        from: verifiedAt[0],
        to: updatedAt[0]
      })

      try {
        await prisma.user.create({
          data: {
            id: ulid(),
            email: faker.internet.email(),
            name: faker.internet.userName(),
            password: await bcrypt.hash('password', 10),
            email_verified: isVerified ? verifiedAt[0] : null,
            createdAt: createdAt[0],
            updatedAt: updatedAt[0],
            deletedAt:  isDeleted ? deletedAt[0] : null
          }
        })
      } catch (err: any) {
        throw err
      }
    }

    console.log("success");
  }
}