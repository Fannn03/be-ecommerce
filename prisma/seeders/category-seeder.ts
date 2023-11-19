import { PrismaClient } from "@prisma/client"
import promptSync from 'prompt-sync'
import { faker } from "@faker-js/faker/locale/id_ID"
import slugify from "slugify"

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

    const categories: Category[] = []
    for(let i = 0; i < Number(number); i++){
      const name  = faker.commerce.department()

      const data = {
        name: name,
        slug: slugify(name, {
          lower: true
        }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      }

      const uniqueName = categories.find((value: Category) => value.name == data.name)
      if(!uniqueName) categories.push(data)
    }

    try {
      await prisma.category.createMany({
        data: categories
      })
    } catch (err) {
      throw err
    }

    console.log('success')
  }
}