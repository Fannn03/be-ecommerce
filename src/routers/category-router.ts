import express, { Router } from 'express'
import { createCategory, findAllCategory } from '../controllers/category-controller';
import authMiddleware, { allowedLevels } from '../middleware/auth-middleware';
import createCategoryMiddleware from '../middleware/categories/create-category-middleware'

const router: Router = express.Router();

router.get('/', findAllCategory)
router.post("/create", authMiddleware, allowedLevels(["superadmin", "admin"]), createCategoryMiddleware, createCategory)

export default router;