import express from 'express'
import registerMiddleware from '../middleware/users/register-middleware'
import { 
  detailsuser,
  loginUser,
  registerUser, 
  updateUser, 
  verifyEmail 
} from '../controllers/user-controller'
import authMiddleware from '../middleware/auth-middleware'
import updateUserMiddleware from '../middleware/users/update-user-middleware'

const router = express.Router()

// auth route
router.post('/register', registerMiddleware, registerUser)
router.post('/login', loginUser)
router.put('/verify', verifyEmail)

// crud user
router.get('/details', authMiddleware, detailsuser)
router.put('/update', [authMiddleware, updateUserMiddleware], updateUser)

export default router