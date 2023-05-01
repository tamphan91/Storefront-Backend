import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import client from './config/database';
import routes from './routes/index';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api',routes);

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
