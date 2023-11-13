import express from 'express'
import multer from 'multer'
import storageMulter from '../config/multer'
import { createStore, updateStore } from '../controllers/store-controller'
import createStoreMiddleware from '../middleware/stores/create-store-middleware'

const router = express.Router()
const upload = multer({storage: storageMulter('/temp')})

router.post('/create', upload.single('file'), createStoreMiddleware, createStore)
router.put('/update', upload.single('file'), createStoreMiddleware, updateStore)

export default router