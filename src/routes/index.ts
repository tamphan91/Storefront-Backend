import express from 'express';
import products from './api/products';
import users from './api/users';
import orders from './api/orders';
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Main API');
});

routes.use('/products', products);
routes.use('/users', users);
routes.use('/orders', orders);

export default routes;