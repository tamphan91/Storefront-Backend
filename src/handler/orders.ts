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

export const createOrder: RequestHandler = async (req: Request, res: Response) => {
  const order = req.body;
  if (order.productId == null || order.quantity == null) {
    return res.status(400).send({ message: `${order.productId == null ? 'ProductId' : 'Quantity'} is required` });
  }
  const currentUser = res.locals.user as User;
  const userId = currentUser.id!;
  try {
    await store.create({ productId: order.productId, userId: userId, quantity: order.quantity });
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
