import Client from '../config/database';

export interface Product {
  id?: number;
  name: string;
  price: number;
  category: string;
}

export class ProductStore {
  async index(): Promise<Product[]>{
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get products. Error: ${error}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find product ${id}. Error: ${error}`);
    }
  }

  async create(product: Product): Promise<number>{
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3)';
      const result = await conn.query(sql, [product.name, product.price, product.category]);
      conn.release();
      return result.rowCount;
    } catch (error){
      throw new Error(`Could not add new product ${product.name}. Error: ${error}`);
    }
  }

}
