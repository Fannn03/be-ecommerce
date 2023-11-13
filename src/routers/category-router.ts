import express, { Router } from 'express'
import { createCategory } from '../controllers/category-controller';
import { allowedLevels } from '../middleware/auth-middleware';
import createCategoryMiddleware from '../middleware/categories/create-category-middleware'

const router: Router = express.Router();

router.post("/create", allowedLevels(["superadmin", "admin"]), createCategoryMiddleware, createCategory)

export default router;