CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    user_id SERIAL references users(id),
    status VARCHAR(10)
);