import express, { Router } from 'express';
import multer from 'multer';
import authMiddleware from '../middleware/auth-middleware';
import storageMulter from '../config/multer';
import createRatingMiddleware from '../middleware/ratings/create-rating-middleware';

const router: Router = express.Router();
const upload = multer({storage: storageMulter('/temp')});

router.post('/create', authMiddleware, upload.array('photos'), createRatingMiddleware);

export default router;