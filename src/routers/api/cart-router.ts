import express, { Router } from 'express';
import createCartMiddleware from '@middleware/carts/create-cart-middleware';
import { createCart, deleteCart, findAllCart, updateCart } from '@controllers/cart-controller';
import updateCartMiddleware from '@middleware/carts/update-cart-middleware';

const router: Router = express.Router();

router.get('/', findAllCart);
router.post('/', createCartMiddleware, createCart);
router.put('/:id', updateCartMiddleware, updateCart);
router.delete('/:id', deleteCart);

export default router;