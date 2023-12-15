import express from 'express';
import multer from 'multer';
import storageMulter from '@config/multer';
import { createStore, detailStore, updateStore } from '@controllers/store-controller';
import createStoreMiddleware from '@middleware/stores/create-store-middleware';
import authMiddleware from '@middleware/auth-middleware';

const router = express.Router();
const upload = multer({storage: storageMulter('/temp')});

router.post('/create', authMiddleware, upload.single('file'), createStoreMiddleware, createStore);
router.get('/:username', detailStore);
router.put('/update', authMiddleware, upload.single('file'), createStoreMiddleware, updateStore);

export default router;