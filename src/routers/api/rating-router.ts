import express, { Router } from 'express';
import multer from 'multer';
import authMiddleware from '@middleware/auth-middleware';
import storageMulter from '@config/multer';
import createRatingMiddleware from '@middleware/ratings/create-rating-middleware';
import { createRating, findAllRating } from '@controllers/rating-controller';

const router: Router = express.Router();
const upload = multer({storage: storageMulter('/temp')});

router.get('/:slug', findAllRating);
router.post('/create', authMiddleware, upload.array('photos'), createRatingMiddleware, createRating);

export default router;