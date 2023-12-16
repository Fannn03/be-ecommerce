import { PrismaClient } from "@prisma/client"
import promptSync from 'prompt-sync'
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()
const prompt = promptSync()

export default {
  name: 'cart',
  run: async () => {
    console.log("[Q] How many cart do you want to create? type C to cancel.");
    let number = prompt("[A] Default 75: ");
    if(number !== null && number.toLowerCase() === "c") return console.log("Operation cancelled by user.");
    if(!Number(number)) number = "75";

    console.log("[S] Seeding Cart")
    
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null
      }
    })

    const products = await prisma.product.findMany({
      where: {
        deletedAt: null
      }
    })

    if(!users.length) return console.log("There's no data users exists!");
    if(!products.length) return console.log("There's no data products exist!");
    
    for (let i = 0; i < Number(number); i++) {
      const getUser = faker.number.int({
        min: 0,
        max: users.length - 1
      })

      const getProduct = faker.number.int({
        min: 0,
        max: products.length - 1
      })

      try {
        await prisma.productCart.create({
          data: {
            user_id: users[getUser].id,
            product_id: products[getProduct].id,
            quantity: faker.number.int({ min: 1, max: 5 }),
            is_checkout: faker.datatype.boolean()
          }
        })
      } catch (err) {
        throw err;
      }
    }

    console.log('[S] Success');
  }
}