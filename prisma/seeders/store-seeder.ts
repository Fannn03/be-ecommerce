import { PrismaClient, User } from "@prisma/client"
import promptSync from 'prompt-sync'
import { faker } from "@faker-js/faker"
import axios from "axios"
import fs from 'fs'

const prisma = new PrismaClient()
const prompt = promptSync()

export default {
  name: 'store',
  run: async () => {
    console.log("[Q] How many store do you want to create? type C to cancel.");
    let number = prompt("[A] Default 50: ");
    if(number !== null && number.toLowerCase() === "c") return console.log("Operation cancelled by user.");
    if(!Number(number)) number = "50";

    console.log("[S] Seeding Store")
    if(!fs.existsSync('./public/images/stores')) fs.mkdirSync('./public/images/stores', {recursive: true});

    for(let i = 0; i < Number(number); i++) {
      try {
        const users: User[] | [] = await prisma.user.findMany({
          where: {
            store: {is: null}
          }
        })

        if(!users.length) {
          console.log("Cannot find data user that has no store left.")
          break
        }

        const getUser = faker.number.int({
          min: 0,
          max: users.length - 1
        })

        const photoUrl = faker.image.urlLoremFlickr({
          category: 'people'
        })

        const getPhoto = await axios.get(photoUrl, {
          responseType: 'arraybuffer'
        })
        const isPhoto: boolean = faker.datatype.boolean({
          probability: 0.5
        })

        const isDescription: boolean = faker.datatype.boolean({
          probability: 0.5
        })
        const description = faker.lorem.paragraph()

        await prisma.store.create({
          data: {
            user_id: users[getUser].id,
            username: faker.internet.userName(),
            name: faker.company.name(),
            photos: isPhoto ? `${users[getUser].id}.jpeg` : null,
            description: isDescription ? description : null,
          }
        })

        if(isPhoto) fs.writeFileSync(`./public/images/stores/${users[getUser].id}.jpeg`, getPhoto.data)
      } catch (err) {
        throw err
      }
    }

    console.log("[S] Success");
  }
}