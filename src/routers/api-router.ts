import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from '../docs/api.json'
import userRouter from './user-router'
import documentRouter from './document-router'
import storeRouter from './store-router'
import adminRouter from './admin-router'
import categoryRouter from './category-router'
import productRouter from './product-router'
import cartRouter from './cart-router'
import authMiddleware from '../middleware/auth-middleware'

const router = express.Router()

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
router.use('/users', userRouter)
router.use('/documents', authMiddleware, documentRouter);
router.use('/admins', adminRouter)
router.use('/stores', storeRouter)
router.use('/categories', categoryRouter)
router.use('/products', productRouter)
router.use('/carts', authMiddleware, cartRouter)

export default router