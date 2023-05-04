import { Request, RequestHandler, Response } from 'express';
import OrderStore, { Order } from '../models/order';
import { User } from 'src/models/user';

const store = new OrderStore();
export const getOrders: RequestHandler = async (req: Request, res: Response) => {
  const currentUser = res.locals.user as User;
  const userId = currentUser.id!;
  try {
    const result: Order[] = await store.index(userId.toString());
    res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createOrder: RequestHandler = async (_: Request, res: Response) => {
  const currentUser = res.locals.user as User;
  const userId = currentUser.id!;
  try {
    await store.create(userId);
    res.json({message : 'Create order success'});
  } catch (error) {
    return res.status(500).send({ message: `${(error as Error).message}`});
  }
};

export const getOrderById: RequestHandler = async (req: Request, res: Response) => {
  const currentUser = res.locals.user as User;
  const userId = currentUser.id!;
  try {
    const result: Order = await store.show(req.params.id as string, userId.toString());
    if (result) {
      res.json(result);
    } else {
      res.send({ message: `Order not found with id ${req.params.id}` });
    }
  } catch (error) {
    return res.status(500).send({ message: `${(error as Error).message}`});
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  const quantity: number = parseInt(req.body.quantity);
  try {
    await store.addProduct(quantity, orderId, productId);
    res.json({message : 'add product success'});
  } catch(error) {
    return res.status(500).send({ message: `${(error as Error).message}`});
  }
} 