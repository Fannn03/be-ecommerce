import { PrismaClient, User } from "@prisma/client"
import promptSync from 'prompt-sync'
import { faker } from "@faker-js/faker/locale/id_ID"
import axios from "axios"
import fs from 'fs'

const prisma = new PrismaClient()
const prompt = promptSync()

export default {
  name: 'store',
  run: async () => {
    const number = prompt("How many stores do you want to create ? : ")
    if(!Number(number)) throw new Error("Invalid value number")

    console.log("seeding store...")

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

        const isDeleted: boolean = faker.datatype.boolean({
          probability: 0.2
        })

        const deletedAt: Date[] = faker.date.betweens({
          from: users[getUser].updatedAt,
          to: "2023-01-09T06:34:30.000Z"
        })

        await prisma.store.create({
          data: {
            user_id: users[getUser].id,
            username: faker.internet.userName(),
            name: faker.company.name(),
            photos: isPhoto ? `${users[getUser].id}.jpeg` : null,
            description: isDescription ? description : null,
            createdAt: users[getUser].updatedAt,
            updatedAt: users[getUser].updatedAt,
            deletedAt: isDeleted ? deletedAt[0] : null
          }
        })

        if(isPhoto) fs.writeFileSync(`./public/images/stores/${users[getUser].id}.jpeg`, getPhoto.data)
      } catch (err) {
        throw err
      }
    }

    console.log("success")
  }
}