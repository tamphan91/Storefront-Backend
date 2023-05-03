import supertest from 'supertest';
import app from '../server';
import { Product, ProductStore } from '../models/product';
import { User, UserStore } from '../models/user';
import { hashPassword } from '../util';
import OrderStore, { Order } from '../models/order';

describe('Test Product Model', async () => {
  const store = new ProductStore();
  let products: Product[];
  it('Expected result of index func is array', async () => {
    products = await store.index();
    expect(products).toBeInstanceOf(Array);
  });
  it('Expected result of create func is greater than 0', async () => {
    expect(
      await store.create({ name: 'product' + products.length, price: products.length, category: 'category' + products.length })
    ).toBeGreaterThan(0);
  });
  it('Expected result of show func is not null', async () => {
    expect(await store.show('1')).not.toBeNull();
  });
});

describe('Test User Model', async () => {
  const store = new UserStore();
  let users: User[];
  it('Expected result of index func is array', async () => {
    users = await store.index();
    expect(users).toBeInstanceOf(Array);
  });
  it('Expected result of create func is not null', async () => {
    expect(await store.create({ username: 'admin' + users.length, password: hashPassword('admin' + users.length) })).not.toBeNull();
  });
  it('Expected result of show func is not null', async () => {
    expect(await store.show('1')).not.toBeNull();
  });
  it('Expected result of authenticate func is not null', async () => {
    expect(await store.authenticate('admin0', 'admin0')).not.toBeNull();
  });
  it('Expected result of authenticate func is null', async () => {
    expect(await store.authenticate('admin0', 'admin99')).toBeNull();
  });
});

describe('Test Order Model', async () => {
  const store = new OrderStore();
  let orders: Order[];
  it('Expected result of index func is array', async () => {
    orders = await store.index('1');
    expect(orders).toBeInstanceOf(Array);
  });
  it('Expected result of create func is not null', async () => {
    expect(
      await store.create({productId: 1, userId: 1, quantity: 1})
    ).not.toBeNull();
  });
  it('Expected result of show func is not null', async () => {
    expect(await store.show('1', '1')).not.toBeNull();
  });
});

const request = supertest(app);
let token: string;

describe('Test endpoint responses', () => {
  it('Test Main Server', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});

describe('Test /login endpoint', () => {
  it('Login successfully', async () => {
    const response = await request
      .post('/api/login')
      .send({ username: 'admin0', password: 'admin0' })
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    token = response.body.token;
  });
  it('Login failed', async () => {
    const response = await request
      .post('/api/login')
      .send({ username: 'admin', password: 'abc123' })
      .set('Accept', 'application/json');
    expect(response.status).toBe(401);
  });
});

describe('Test /users endpoint', () => {
  it('get users failed', async () => {
    const response = await request.get('/api/users');
    expect(response.status).toBe(400);
  });
  it('get users successfully', async () => {
    const response = await request.get('/api/users').set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });
});

describe('Test /products endpoint', () => {
  it('Check product and create product', async () => {
    const response = await request.get('/api/products');
    if ((response.body as []).length === 0) {
      await request
        .post('/api/products')
        .send({ name: 'product 1', price: 11, category: 'category 1' })
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json');
    }
  });

  it('get products', async () => {
    const response = await request.get('/api/products');
    expect(response.status).toBe(200);
  });

  it('get product with id 1', async () => {
    const response = await request.get('/api/products/1');
    expect(response.status).toBe(200);
  });
});

describe('Test /orders endpoint', () => {
  it('Check order and create order', async () => {
    const response = await request.get('/api/orders').set('Authorization', 'Bearer ' + token);
    if ((response.body as []).length === 0) {
      await request
        .post('/api/orders')
        .send({ productId: 1, quantity: 1 })
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json');
    }
  });

  it('get orders failed', async () => {
    const response = await request.get('/api/orders');
    expect(response.status).toBe(400);
  });

  it('get orders successfully', async () => {
    const response = await request.get('/api/orders').set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });
});
