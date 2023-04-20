import { Router } from 'express';

const orders = Router();

orders.get('/');
orders.get('/:id');
orders.post('/');

export default orders;