CREATE TABLE orders_products (
    product_id SERIAL references products(id),
    order_id SERIAL references orders(id),
    quantity INTEGER,
    PRIMARY KEY (product_id, order_id)
);