CREATE TABLE products (
    id SERIAL PRIMARY  KEY,
    name VARCHAR(100) UNIQUE,
    price decimal,
    category VARCHAR(100)
);