import { Router } from 'express';

const users = Router();

users.get('/');
users.get('/:id');
users.post('/');

export default users;