import { Router } from 'express';
import { createUser, getUserById, getUsers } from '../../handler/users';
import { verifyAuthToken } from '../../middleware/auth';

const users = Router();

users.get('/', verifyAuthToken, getUsers);
users.get('/:id', verifyAuthToken, getUserById);
users.post('/', createUser);

export default users;