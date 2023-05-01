import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
let token: string;

describe('Test endpoint responses', () => {
  it('Test Main Server', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('Check user and create user for login', async () => {
    const response = await request
      .post('/api/login')
      .send({ username: 'admin', password: 'admin' })
      .set('Accept', 'application/json');
    if (response.status === 401) {
      await request.post('/api/users').send({ username: 'admin', password: 'admin' }).set('Accept', 'application/json');
    }
  });
});

describe('Test /login endpoint', () => {
  it('Login successfully', async () => {
    const response = await request
      .post('/api/login')
      .send({ username: 'admin', password: 'admin' })
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
