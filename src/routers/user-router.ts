import express from 'express'
import registerMiddleware from '../middleware/register-middleware'
import { 
  loginUser,
  registerUser, 
  updateUser, 
  verifyEmail 
} from '../controllers/user-controller'

const router = express.Router()

// auth route
router.post('/register', registerMiddleware, registerUser)
router.post('/login', loginUser)
router.put('/verify', verifyEmail)
router.put('/update/:id', updateUser)

export default router