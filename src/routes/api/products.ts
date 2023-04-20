import { Router } from 'express';

const products = Router();

products.get('/');
products.get('/:id');
products.post('/');

export default products;