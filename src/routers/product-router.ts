import express, { Router } from 'express'
import multer from 'multer'
import storageMulter from '../config/multer'
import authMiddleware from '../middleware/auth-middleware'
import { createProduct, findAllProduct, detailProduct } from '../controllers/product-controller'
import createProductMiddleware from '../middleware/products/create-product-middleware'

const router: Router = express.Router()
const upload = multer({storage: storageMulter('/temp')})

router.get('/', findAllProduct)
router.get('/:slug', detailProduct)
router.post('/create', authMiddleware, upload.array('photos'), createProductMiddleware, createProduct)

export default router