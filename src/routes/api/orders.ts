import { Router } from 'express';
import { addProduct, createOrder, getOrderById, getOrders } from '../../handler/orders';
import { verifyAuthToken } from '../../middleware/auth';

const orders = Router();

orders.get('/', verifyAuthToken, getOrders);
orders.get('/:id', verifyAuthToken, getOrderById);
orders.post('/', verifyAuthToken, createOrder);
orders.post('/:id/products', verifyAuthToken, addProduct);

export default orders;