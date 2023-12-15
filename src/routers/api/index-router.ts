import express from 'express'
import userRouter from './user-router'
import documentRouter from './document-router'
import addressRouter from './address-router'
import storeRouter from './store-router'
import adminRouter from './admin-router'
import categoryRouter from './category-router'
import productRouter from './product-router'
import cartRouter from './cart-router'
import ratingRouter from './rating-router'
import authMiddleware from '@middleware/auth-middleware'

const router = express.Router()

router.use('/users', userRouter);
router.use('/documents', authMiddleware, documentRouter);
router.use('/address', authMiddleware, addressRouter);
router.use('/admins', adminRouter);
router.use('/stores', storeRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/carts', authMiddleware, cartRouter);
router.use('/ratings', ratingRouter);

export default router;