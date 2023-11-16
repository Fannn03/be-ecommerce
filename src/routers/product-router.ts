import express, { Router } from 'express'
import authMiddleware from '../middleware/auth-middleware'
import { createProduct } from '../controllers/product-controller'

const router: Router = express.Router()

router.post('/create', authMiddleware, createProduct)

export default router