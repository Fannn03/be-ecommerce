import express, { Router } from 'express';
import createAddressMiddleware from '@middleware/address/create-address-middleware';
import { createAddress, findAllAddress } from '@controllers/address-controller';

const router: Router = express.Router();

router.get('/', findAllAddress);
router.post('/', createAddressMiddleware, createAddress);

export default router;