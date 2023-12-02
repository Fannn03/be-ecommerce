import { PrismaClient } from "@prisma/client"
import promptSync from 'prompt-sync'
import { faker } from "@faker-js/faker/locale/id_ID"
import slugify from "slugify"
import axios from "axios"
import fs from 'fs'

const prisma = new PrismaClient()
const prompt = promptSync()

interface Category {
  name: string,
  slug: string,
  createdAt: Date,
  updatedAt: Date
}

export default {
  name: 'category',
  run: async () => {
    const number = prompt("How many category do you want to create ? : ")
    if(!Number(number)) throw new Error("Invalid value number")

    console.log("seeding category...")

    for(let i = 0; i < Number(number); i++){
      const photo = await axios.get(faker.image.urlLoremFlickr(), {
        responseType: 'arraybuffer'
      })
      const name = faker.commerce.department()
      const filename = `${name}.jpeg`;

      const data = {
        name: name,
        slug: slugify(name, {
          lower: true
        }),
        photos: filename,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      }

      try {
        const category = await prisma.category.create({
          data: data
        })

        if(!fs.existsSync('./public/images/categories')) fs.mkdirSync('./public/images/categories', { recursive: true });
        fs.writeFileSync(`./public/images/categories/${category.photos}`, photo.data);
      } catch (err) {
        console.log('error possible duplicate category name, skipping proses.')
      }
    }

    console.log('success')
  }
}