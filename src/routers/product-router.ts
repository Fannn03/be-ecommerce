import express, { Router } from 'express'
import authMiddleware from '../middleware/auth-middleware'
import { createProduct } from '../controllers/product-controller'
import createProductMiddleware from '../middleware/products/create-product-middleware'

const router: Router = express.Router()

router.post('/create', authMiddleware, createProductMiddleware, createProduct)

export default router