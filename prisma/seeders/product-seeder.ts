import { Category, PrismaClient, Store } from "@prisma/client"
import promptSync from 'prompt-sync'
import { faker } from "@faker-js/faker"
import slugify from "slugify"
import axios from "axios"
import fs from 'fs'

const prisma = new PrismaClient()
const prompt = promptSync()

export default {
  name: 'product',
  run: async () => {
    console.log("[Q] How many product do you want to create? type C to cancel.");
    let number = prompt("[A] Default 50: ");
    if(number.toLowerCase() === "c") return console.log("Operation cancelled by user.");
    if(!Number(number)) number = "50";

    console.log("seeding product...")
    if(!fs.existsSync('./public/images/products')) fs.mkdirSync('./public/images/products', { recursive: true });

    for(let i = 0; i < Number(number); i++) {
      const stores: Store[] | [] = await prisma.store.findMany({
        where: {
          deletedAt: null
        }
      })
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
      const slug = slugify(`${stores[getStore].name} ${productName} ${new Date().getTime()}`, {
        lower: true
      })

      const price = faker.number.int({
        min: 5000,
        max: 550000
      })
      const stock = faker.number.int({
        min: 0,
        max: 1000
      })

      try {
        const product = await prisma.product.create({
          data: {
            store_id: stores[getStore].id,
            category_id: categories[getCategory].id,
            name: productName,
            slug: slug.toLowerCase(),
            description: faker.lorem.paragraphs(),
            price: price,
            stock: stock,
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            images: {
              createMany: {
                data: [
                  {name: slugify(`${stores[getStore].name} ${productName} ${new Date().getTime()} 1.jpeg`, {
                    lower: true
                  })},
                  {name: slugify(`${stores[getStore].name} ${productName} ${new Date().getTime()} 2.jpeg`, {
                    lower: true
                  })}
                ]
              }
            }
          },
          include: {
            images: true
          }
        })

        const images = product.images;
        for (let image in images) {
          const fileName = images[image].name;
          const randomImage = await axios.get(faker.image.urlLoremFlickr(), {
            responseType: 'arraybuffer'
          });

          fs.writeFileSync(`./public/images/products/${fileName}`, randomImage.data);
        }
      } catch (err) {
        throw err
      }
    }

    console.log('success');
  }
}