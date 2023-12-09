import { PrismaClient } from "@prisma/client"
import promptSync from 'prompt-sync'
import { faker } from '@faker-js/faker'
import { ulid } from 'ulid'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient
const prompt = promptSync()

export default {
  name: 'user',
  run: async () => {
    console.log('[Q] How many user do you want to create? type C to cancel.');
    let number = prompt("[A] Default 100: ");
    if(number !== null && number.toLowerCase() === "c") return console.log("Operation cancelled by user.");
    if(!Number(number)) number = "100";

    console.log("[S] Seeding User");
    
    for(let i = 0; i < Number(number); i++) {
      const isVerified: boolean = faker.datatype.boolean({
        probability: 0.5
      })

      const createdAt: Date[] = faker.date.betweens({
        from: "2019-01-01T06:34:30.000Z",
        to: "2023-01-09T06:34:30.000Z"
      })

      const verifiedAt: Date[] = faker.date.betweens({
        from: createdAt[0],
        to: "2023-01-09T06:34:30.000Z"
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
          }
        })
      } catch (err: any) {
        throw err
      }
    }

    console.log("[S] Success");
  }
}