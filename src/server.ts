import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import client from './config/database';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  client
    .connect()
    .then(() => console.log('connected'))
    .catch((err) => console.error('connection error', err.stack))
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
