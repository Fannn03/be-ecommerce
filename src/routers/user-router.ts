import express from 'express'
import registerMiddleware from '../middleware/register-middleware'
import { registerUser } from '../controllers/user-controller'

const router = express.Router()

router.post('/', registerMiddleware, registerUser)

export default router