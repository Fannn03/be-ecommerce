import { transport } from "@config/mailer"
import 'dotenv/config'
import registerMessage from "@common/helpers/email/register-message"

export const sendRegisterMail = async (receiver: string, keyId: string) => {
  transport.sendMail({
    from: process.env.EMAIL_USER,
    to: receiver,
    subject: '[Registration] Flattenbot E-commerce',
    text: 'Complete your registration email to activate your account',
    html: registerMessage(keyId)
  })
}