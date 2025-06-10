import { Router } from 'express';
import { getOrders, updateOrderStatus, createOrder, optimizeRoutes } from '../controllers/orderController';
import asyncHandler from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(getOrders));
router.patch('/:id/status', asyncHandler(updateOrderStatus));
router.post('/', asyncHandler(createOrder));
router.get('/optimize', asyncHandler(optimizeRoutes));

export default router;
