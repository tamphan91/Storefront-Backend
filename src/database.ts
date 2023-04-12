import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env 

const client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
})

client
  .query('SELECT $1::text as name', ['brianc'])
  .then((res) => console.log(res.rows[0].name)) // brianc
  .catch((err) => console.error('Error executing query', err.stack))

export default client