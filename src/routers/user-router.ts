import express from 'express'
import registerMiddleware from '../middleware/register-middleware'
import { loginUser, registerUser } from '../controllers/user-controller'

const router = express.Router()

router.post('/register', registerMiddleware, registerUser)
router.post('/login', loginUser)

export default router