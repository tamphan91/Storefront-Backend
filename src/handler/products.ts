import { Request, Response } from 'express';

export const getProducts = (req: Request, res: Response) => {
  console.log('get products');
  res.send('get products');
};

export const createProduct = (req: Request, res: Response) => {
  console.log('create product');
  res.send('create product');
};

export const getProductById = (req: Request, res: Response) => {
    console.log('get product');
    res.send('get product');
  };