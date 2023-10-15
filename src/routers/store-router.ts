import express from 'express'
import multer from 'multer'
import { createStore } from '../controllers/store-controller'
import createStoreMiddleware from '../middleware/create-store-middleware'

const router = express.Router()
const file = multer()

router.post('/create', file.single('file'), createStoreMiddleware, createStore)

export default router