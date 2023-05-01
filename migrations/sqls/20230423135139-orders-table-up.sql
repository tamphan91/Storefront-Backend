CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    product_id SERIAL,
    user_id SERIAL,
    quantity INTEGER,
    status VARCHAR(255)
);