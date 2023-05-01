import { Request, RequestHandler, Response } from 'express';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();
export const getProducts = async (req: Request, res: Response) => {
  try {
    const result: Product[] = await store.index();
    res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createProduct: RequestHandler = async (req: Request, res: Response) => {
  const product = req.body;
  if (product.name == null || product.price == null) {
    return res.status(400).send({ message: `${product.name == null ? 'name' : 'price'} is required` });
  }
  try{
    await store.create({ name: product.name, price: product.price, category: product.category });
    res.json({message : 'Create product success'});
  } catch (error) {
    return res.status(500).send({ message: `${(error as Error).message}`});
  }
};

export const getProductById: RequestHandler = async (req: Request, res: Response) => {
  try{
    const result: Product = await store.show(req.params.id as string);
    if(result){
      res.json(result);
    } else {
      res.send({message: `Product not found with id ${req.params.id}`})
    }
  } catch (error) {
    return res.status(500).send({ message: `${(error as Error).message}`});
  }
};
