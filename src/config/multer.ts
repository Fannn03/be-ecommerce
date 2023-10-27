import { Request } from 'express'
import multer from 'multer'

export default (path: string) => {
  return multer.diskStorage({
    destination: `public/images${path}`,
    filename: (req: Request, file: Express.Multer.File, cb) => {
      const extension = file.mimetype.split("/")[1]
      
      cb(null, file.originalname + '-' + Date.now() + '.' + extension)
    }
  })
}