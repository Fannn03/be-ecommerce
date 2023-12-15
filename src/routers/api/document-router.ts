import express, { Router } from 'express'
import multer from 'multer';
import storageMulter from '@config/multer'
import { createDocument } from '@controllers/document-controller';
import createDocumentMiddleware from '@middleware/documents/create-document-middleware';

const router: Router = express.Router();
const upload = multer({storage: storageMulter("/temp")})

router.post('/', upload.single('photos'), createDocumentMiddleware, createDocument);

export default router;