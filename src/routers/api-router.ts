import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from '../docs/api.json'
import userRouter from './user-router'
import storeRouter from './store-router'
import authMiddleware from '../middleware/auth-middleware'

const router = express.Router()

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
router.use('/users', userRouter)
router.use('/stores', authMiddleware, storeRouter)

export default router