import { Request, RequestHandler, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import { hashPassword } from '../util';


const privateKey = process.env.TOKEN_SECRET;

const store = new UserStore();
export const getUsers = async (req: Request, res: Response) => {
  try {
    const result: User[] = await store.index();
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createUser: RequestHandler = async (req: Request, res: Response) => {
  const user = req.body;

  if (user.password == null || user.username == null) {
    return res.status(400).send({ message: `${user.username == null ? 'username' : 'password'} is required` });
  }

  const hash = hashPassword(user.password);
  try {
    await store.create({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      password: hash,
    });
    res.json({message : 'Create user success'});
  } catch (error) {
    return res.status(500).send({ message: `${(error as Error).message}`});
  }
};

export const getUserById: RequestHandler = async (req: Request, res: Response) => {
  const result: User = await store.show(req.params.id as string);
  if(result){
    res.json(result);
  } else {
    res.send({message: `User not found with id ${req.params.id}`})
  }
};

export const authenticate: RequestHandler = async (req: Request, res: Response) => {
  const userInput = req.body;
  try {
    const user = await store.authenticate(userInput.username, userInput.password);
    if (user == null) {
      return res.status(401).send({ message: 'Login failed' });
    }
    const token = jwt.sign(user, privateKey as string);
    res.json({ token });
  } catch (error) {
    return res.status(500).send({ message: `${(error as Error).message}`});
  }
};
