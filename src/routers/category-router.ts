import express, { Router } from 'express'
import { createCategory } from '../controllers/category-controller';
import { allowedLevels } from '../middleware/auth-middleware';

const router: Router = express.Router();

router.post("/create", allowedLevels(["superadmin", "admin"]), createCategory)

export default router;