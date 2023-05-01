# Storefront-Backend
Storefront Backend

### setup project
npm install
cp .env.example .env (Create .env file from .env.example file)
docker-compose up -d (Docker is required)

### scripts
npm run prettier
npm run lint
npm run test
npm run dev
npm run start

### ENDPOINTS (you can use Udacity.postman_collection.json to import to Postman to testing)
http://localhost:8000/api/login
http://localhost:8000/api/products
http://localhost:8000/api/users
http://localhost:8000/api/orders