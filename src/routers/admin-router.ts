import express from 'express'
import registerMiddleware from '../middleware/admins/register-middleware'
import { registerAdmin, loginAdmin, updateAdmin } from '../controllers/admin-controller'
import authMiddleware from '../middleware/auth-middleware'

const router = express.Router()

router.post('/create', authMiddleware, registerMiddleware, registerAdmin)
router.put('/:id', updateAdmin)
router.post('/login', loginAdmin)

export default router