import express, { Router } from 'express';
import createAddressMiddleware from '@middleware/address/create-address-middleware';
import { createAddress } from '@controllers/address-controller';

const router: Router = express.Router();

router.post('/', createAddressMiddleware, createAddress);

export default router;