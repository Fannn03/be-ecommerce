import express, { Router } from 'express'
import { createDocument } from '../controllers/document-controller';

const router: Router = express.Router();

router.post('/create', createDocument);

export default router;