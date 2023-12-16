import { PrismaClient } from "@prisma/client"
import promptSync from 'prompt-sync'
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()
const prompt = promptSync()

export default {
  name: 'address',
  run: async () => {
    console.log("[Q] How many address do you want to create? type C to cancel.");
    let number = prompt("[A] Default 50: ");
    if(number !== null && number.toLowerCase() === "c") return console.log("Operation cancelled by user.");
    if(!Number(number)) number = "50";

    console.log("[S] Seeding Address")
    
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null
      }
    })

    if(!users.length) return console.log("There's not data users exist!");

    for(let i = 0; i <= Number(number); i++) {
      const getUser = faker.number.int({
        min: 0,
        max: users.length - 1
      })

      try {
        await prisma.address.create({
          data: {
            user_id: users[getUser].id,
            name: faker.person.fullName(),
            phone: faker.phone.number(),
            street: faker.location.streetAddress(),
            zip_code: Number(faker.location.zipCode('#####')),
            village: faker.location.street(),
            district: faker.location.city(),
            regency: faker.location.state(),
            province: faker.location.country(),
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude(),
          }
        })
      } catch (err) {
        throw err;
      }
    }

    console.log('[S] Success');
  }
}