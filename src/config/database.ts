import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB_TEST,
    POSTGRES_PORT_TEST,
    POSTGRES_PASSWORD_TEST,
    POSTGRES_USER_TEST,
} = process.env 

const client = new Pool({
    host: POSTGRES_HOST,
    database: process.env.NODE_ENV == 'test' ? POSTGRES_DB_TEST :  POSTGRES_DB,
    port: parseInt((process.env.NODE_ENV == 'test' ? POSTGRES_PORT_TEST :  POSTGRES_PORT) as string),
    user: process.env.NODE_ENV == 'test' ? POSTGRES_USER_TEST :  POSTGRES_USER,
    password: process.env.NODE_ENV == 'test' ? POSTGRES_PASSWORD_TEST :  POSTGRES_PASSWORD,
})

export default client