import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
export default {
  name: 'superadmin',
  run: async () => {
      try {
      console.log('[S] Seeding Superadmin');
      await prisma.admin.create({
        data: {
          email: 'superadmin@gmail.com',
          name: 'superadmin',
          password: await bcrypt.hash('password', 10),
          email_verified: new Date().toISOString(),
          level: 'superadmin'
        }
      })
        console.log('[S] Success');
      } catch (err) {
        return  err
      }
  }
}