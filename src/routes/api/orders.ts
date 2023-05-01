import { Router } from 'express';
import { createOrder, getOrderById, getOrders } from '../../handler/orders';
import { verifyAuthToken } from '../../middleware/auth';

const orders = Router();

orders.get('/', verifyAuthToken, getOrders);
orders.get('/:id', verifyAuthToken, getOrderById);
orders.post('/', verifyAuthToken, createOrder);

export default orders;