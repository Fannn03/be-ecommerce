import { PrismaClient } from "@prisma/client"
import promptSync from 'prompt-sync'
import { faker } from "@faker-js/faker"
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
    console.log("[Q] How many category do you want to create? type C to cancel.");
    let number = prompt("[A] Default posibbly less than 10: ");
    if(number !== null && number.toLowerCase() === "c") return console.log("Operation cancelled by user.");
    if(!Number(number)) number = "10";

    console.log("[S] Seeding Category")
    if(!fs.existsSync('./public/images/categories')) fs.mkdirSync('./public/images/categories', { recursive: true });
    
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
      }

      try {
        const category = await prisma.category.create({
          data: data
        })

        fs.writeFileSync(`./public/images/categories/${category.photos}`, photo.data);
      } catch (err) {
        console.log('error possible duplicate category name, skipping proses.')
      }
    }

    console.log('[S] Success');
  }
}