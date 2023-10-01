import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from '../docs/api.json'

const router = express.Router()

router.get('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

export default router