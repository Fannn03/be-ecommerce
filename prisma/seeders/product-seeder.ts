import { Category, PrismaClient, Store } from "@prisma/client"
import promptSync from 'prompt-sync'
import { faker } from "@faker-js/faker/locale/id_ID"

const prisma = new PrismaClient()
const prompt = promptSync()

export default {
  name: 'product',
  run: async () => {
    const number = prompt("How many product do you want to create ? : ")
    if(!Number(number)) throw new Error("Invalid value number")

    console.log("seeding product...")

    for(let i = 0; i < Number(number); i++) {
      const stores: Store[] | [] = await prisma.store.findMany()
      const categories: Category[] | [] = await prisma.category.findMany()

      const getStore = faker.number.int({
        min: 0,
        max: stores.length -1
      })

      const getCategory = faker.number.int({
        min: 0,
        max: categories.length - 1
      })

      const productName = faker.commerce.productName()
      const slug = productName.replace(' ', '-') + '-' + new Date().getTime()

      const price = faker.number.int({
        min: 5000,
        max: 550000
      })
      const stock = faker.number.int({
        min: 0,
        max: 1000
      })

      const isDeleted: boolean = faker.datatype.boolean({
        probability: 0.3
      })

      try {
        await prisma.product.create({
          data: {
            store_id: stores[getStore].id,
            category_id: categories[getCategory].id,
            name: productName,
            slug: slug.toLowerCase(),
            price: price,
            stock: stock,
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            deletedAt: isDeleted ? faker.date.recent() : null
          }
        })
      } catch (err) {
        throw err
      }
    } 
  }
}