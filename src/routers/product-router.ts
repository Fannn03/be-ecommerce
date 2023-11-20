import express, { Router } from 'express'
import multer from 'multer'
import storageMulter from '../config/multer'
import authMiddleware from '../middleware/auth-middleware'
import { createProduct, findAllProduct } from '../controllers/product-controller'
import createProductMiddleware from '../middleware/products/create-product-middleware'

const router: Router = express.Router()
const upload = multer({storage: storageMulter('/temp')})

router.get('/', findAllProduct)
router.post('/create', upload.array('photos'), authMiddleware, createProductMiddleware, createProduct)

export default router