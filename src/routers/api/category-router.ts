import express, { Router } from 'express'
import multer from 'multer'
import storageMulter from '@config/multer'
import { createCategory, findAllCategory } from '@controllers/category-controller';
import authMiddleware, { allowedLevels } from '@middleware/auth-middleware';
import createCategoryMiddleware from '@middleware/categories/create-category-middleware'

const router: Router = express.Router();
const upload = multer({storage: storageMulter('/temp')});

router.get('/', findAllCategory);
router.post("/create", authMiddleware, allowedLevels(["superadmin", "admin"]), upload.single('photos'), createCategoryMiddleware, createCategory);

export default router;