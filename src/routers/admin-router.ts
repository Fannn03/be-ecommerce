import express from 'express'
import registerMiddleware from '../middleware/admins/register-middleware'
import { loginAdmin } from '../controllers/admin-controller'

const router = express.Router()

// router.post('/create', registerMiddleware)
router.post('/login', loginAdmin)

export default router