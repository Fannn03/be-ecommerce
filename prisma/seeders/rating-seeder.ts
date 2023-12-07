import { PrismaClient, RatingImage } from "@prisma/client";
import promptSync from 'prompt-sync';
import { faker } from '@faker-js/faker/locale/en_IND';
import slugify from "slugify";
import fs from 'fs';
import axios from "axios";

const prisma = new PrismaClient();
const prompt = promptSync();

export default {
  name: 'rating',
  run: async () => {
    const number = prompt("How many ratings do you want to create ? : ")
    if(!Number(number)) throw new Error("Invalid value number")

    console.log("seeding ratings...")
    for(let i: number = 0; i <= Number(number); i ++) {
      const users = await prisma.user.findMany({
        where: { deletedAt: null }
      });
      const getUser = faker.number.int({
        min: 0,
        max: users.length - 1
      })

      const products = await prisma.product.findMany({
        where: { deletedAt: null }
      })
      const getProduct = faker.number.int({
        min: 0,
        max: products.length - 1
      })

      try {
        const rating = await prisma.rating.create({
          data: {
            user_id: users[getUser].id,
            product_id: products[getProduct].id,
            rating: faker.number.int({ min: 1, max: 5 }),
            comment: faker.lorem.paragraphs(),
            images: {
              createMany: {
                data: [
                  { name: slugify(`${products[getProduct].id}-${users[getUser].id}-${new Date().getTime()}-1.jpeg`) },
                  { name: slugify(`${products[getProduct].id}-${users[getUser].id}-${new Date().getTime()}-2.jpeg`) }
                ]
              }
            }
          },
          include: { images: true }
        })

        const images = rating.images
        for (let image in images) {
          const getImage = await axios.get(faker.image.urlLoremFlickr(), { responseType: 'arraybuffer' });

          if(!fs.existsSync('public/images/ratings')) fs.mkdirSync('public/images/ratings', { recursive: true });
          fs.writeFileSync(`public/images/ratings/${images[image].name}`, getImage.data);
        }
        
        console.log('success');
      } catch (err) {
        throw err
      }
    }
  }
}