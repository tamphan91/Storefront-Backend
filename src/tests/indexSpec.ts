import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('Test Main Server', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
