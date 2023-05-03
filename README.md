# Storefront-Backend
Storefront Backend

### setup project
```
- npm install
- cp .env.example .env (Create .env file from .env.example file)
    + Modify the value of NODE_ENV to test or dev.
    + Modify the value of POSTGRES_PORT(POSTGRES_PORT_TEST for test env) to initialize the Postgres Port in docker or to match your local Postgres Port.
    + Modify the values of POSTGRES_DB(POSTGRES_DB_TEST for test env), POSTGRES_USER(POSTGRES_USER_TEST for test env), POSTGRES_PASSWORD(POSTGRES_PASSWORD_TEST for test env) to match your local Postgres (if you're using local Postgres).
- docker-compose up -d (Docker is required)
- db-migrate up (to create tables, need to run for both test and dev environments too)
```
### scripts
```
- npm run prettier
- npm run lint
- npm run test
- npm run dev
- npm run start
```
### ENDPOINTS (you can use Udacity.postman_collection.json to import to Postman to testing)
- http://localhost:8000/api/login
- http://localhost:8000/api/products
- http://localhost:8000/api/users
- http://localhost:8000/api/orders