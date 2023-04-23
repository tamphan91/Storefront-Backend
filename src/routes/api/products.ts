import { Router, Request, Response } from 'express';
import { createProduct, getProductById, getProducts } from '../../handler/products';

const products = Router();

products.get('/', getProducts);
products.get('/:id', getProductById);
products.post('/', createProduct);

export default products;
