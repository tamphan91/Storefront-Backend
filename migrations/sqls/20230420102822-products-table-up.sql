CREATE TABLE products (
    id SERIAL PRIMARY  KEY,
    name VARCHAR(150) UNIQUE,
    price decimal,
    category VARCHAR(100)
);