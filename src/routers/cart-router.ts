import express, { Router } from 'express';
import createCartMiddleware from '../middleware/carts/create-cart-middleware';
import { createCart } from '../controllers/cart-controller';

const router: Router = express.Router();

router.post('/create', createCartMiddleware, createCart);

export default router;