import mailer from 'nodemailer'
import 'dotenv/config'

const env = process.env

export const transport = mailer.createTransport({
  host: env.EMAIL_HOST,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD
  }
})