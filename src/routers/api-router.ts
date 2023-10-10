import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from '../docs/api.json'
import userRouter from './user-router'

const router = express.Router()

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
router.use('/users', userRouter)

export default router