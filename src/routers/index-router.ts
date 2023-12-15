import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from 'docs/api.json';
import apiRouter from "@routers/api/index-router";

const router: Router = express.Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
router.use('/api/v1', apiRouter);

export default router;