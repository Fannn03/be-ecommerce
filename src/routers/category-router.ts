import express, { Router } from 'express'
import { createCategory } from '../controllers/category-controller';

const router: Router = express.Router();

router.post("/create", createCategory)

export default router;