CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    user_name VARCHAR(100) UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password VARCHAR(100)
);