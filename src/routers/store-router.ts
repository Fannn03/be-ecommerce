import express from 'express'
import multer from 'multer'
import storageMulter from '../config/multer'
import { createStore } from '../controllers/store-controller'
import createStoreMiddleware from '../middleware/create-store-middleware'

const router = express.Router()
const upload = multer({storage: storageMulter('/temp')})

router.post('/create', upload.single('file'), createStoreMiddleware, createStore)

export default router