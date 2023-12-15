import express, { Router } from 'express';
import createCartMiddleware from '@middleware/carts/create-cart-middleware';
import { createCart, findAllCart } from '@controllers/cart-controller';

const router: Router = express.Router();

router.get('/', findAllCart);
router.post('/', createCartMiddleware, createCart);

export default router;