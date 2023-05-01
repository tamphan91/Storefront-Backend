CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    user_name VARCHAR(150) UNIQUE,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    password VARCHAR(150)
);