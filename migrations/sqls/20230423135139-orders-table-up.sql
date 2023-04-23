CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    productId SERIAL,
    userId SERIAL,
    quantity INTEGER,
    status VARCHAR(255)
);