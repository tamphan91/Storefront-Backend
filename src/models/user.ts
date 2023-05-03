import Client from '../config/database';
import bcrypt from 'bcrypt';
const pepper = process.env.BCRYPT_PASSWORD;
export interface User {
  id?: number;
  username: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

export class UserStore {
  async index(): Promise<User[]>{
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get users. Error: ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user ${id}. Error: ${error}`);
    }
  }

  async create(user: User): Promise<User>{
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO users (user_name, first_name, last_name, password) VALUES($1, $2, $3, $4)';
      const result = await conn.query(sql, [user.username, user.firstName, user.lastName, user.password]);
      conn.release();
      return result.rows[0];
    } catch (error){
      throw new Error(`Could not add new user ${user.username}. Error: ${error}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect();
    const sql = 'SELECT id, user_name, password FROM users WHERE user_name=($1)';
    const result = await conn.query(sql, [username]);
    if(result.rowCount > 0) {
      const user = result.rows[0];
      if(bcrypt.compareSync(password + pepper, user.password)){
        return user;
      }
    }
    return null;
  }  

}
