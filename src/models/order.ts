import Client from '../config/database';

enum OrderStatus {
  Active = "ACTIVE",
  Complete = "COMPLETE"
}

export interface Order {
  id?: number;
  productId: number;
  userId: number;
  quantity: string;
  status?: OrderStatus;
}

export default class OrderStore {
  async index(userId: string): Promise<Order[]>{
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders Where user_id=$1';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get orders. Error: ${error}`);
    }
  }

  async show(id: string, userId: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id=$1 and user_id=$2';
      const result = await conn.query(sql, [id, userId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find order ${id}. Error: ${error}`);
    }
  }

  async create(order: Order): Promise<Order>{
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO orders (product_id, user_id, quantity, status) VALUES($1, $2, $3, $4)';
      const result = await conn.query(sql, [order.productId, order.userId, order.quantity, OrderStatus.Active]);
      conn.release();
      return result.rows[0];
    } catch (error){
      throw new Error(`Could not add new order. Error: ${error}`);
    }
  }

}
