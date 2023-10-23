import express from 'express'
import registerMiddleware from '../middleware/admins/register-middleware'
import { createAdmin, loginAdmin } from '../controllers/admin-controller'

const router = express.Router()

router.post('/', registerMiddleware, createAdmin)
router.post('/login', loginAdmin)

export default router