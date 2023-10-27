import express from 'express'
import registerMiddleware from '../middleware/admins/register-middleware'
import { createAdmin, deleteAdmin, loginAdmin, updateAdmin } from '../controllers/admin-controller'

const router = express.Router()

router.post('/', registerMiddleware, createAdmin)
router.patch('/:id', updateAdmin)
router.delete('/:id', deleteAdmin)
router.post('/login', loginAdmin)

export default router