import express from 'express';
import products from './api/products';
import users from './api/users';
import orders from './api/orders';
import { authenticate } from '../handler/users';
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Main API');
});

routes.post('/login', authenticate);
routes.use('/products', products);
routes.use('/users', users);
routes.use('/orders', orders);

export default routes;