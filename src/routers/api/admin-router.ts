import express from 'express';
import registerMiddleware from '@middleware/admins/register-middleware';
import { loginAdmin, registerAdmin, deleteAdmin, updateAdmin } from '@controllers/admin-controller';
import authMiddleware from '@middleware/auth-middleware';

const router = express.Router();

router.post('/register', authMiddleware, registerMiddleware, registerAdmin);
router.post('/login', loginAdmin);
router.put('/', updateAdmin);
router.delete('/:id', deleteAdmin);

export default router;