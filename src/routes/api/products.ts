import { Router } from 'express';
import { createProduct, getProductById, getProducts } from '../../handler/products';
import { verifyAuthToken } from '../../middleware/auth';

const products = Router();

products.get('/', getProducts);
products.get('/:id', getProductById);
products.post('/', verifyAuthToken, createProduct);

export default products;
