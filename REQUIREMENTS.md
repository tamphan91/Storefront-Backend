# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index (api/products GET)
- Show (api/products/:id GET)
- Create (api/products POST) [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index (api/users GET) [token required]
- Show (api/users/:id GET) [token required]
- Create (api/users POST) [token required]

#### Orders
- Current Order by user (api/orders GET)(args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
####  Table "public.products"
  Column  |          Type          | Collation | Nullable |               Default
|-----------|------------|-----------|----------|-------------|
 id       | integer                |           | not null | nextval('products_id_seq'::regclass)
 name     | character varying(100) |           |          |
 price    | numeric                |           |          |
 category | character varying(100) |           |          |

Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
    "products_name_key" UNIQUE CONSTRAINT, btree (name)
Referenced by:
    TABLE "orders_products" CONSTRAINT "orders_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

####  Table "public.users"
   Column   |          Type          | Collation | Nullable |              Default
|-----------|------------|-----------|----------|-------------|
 id         | integer                |           | not null | nextval('users_id_seq'::regclass)
 user_name  | character varying(100) |           |          |
 first_name | character varying(100) |           |          |
 last_name  | character varying(100) |           |          |
 password   | character varying(100) |           |          |

Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_user_name_key" UNIQUE CONSTRAINT, btree (user_name)
Referenced by:
    TABLE "orders_products" CONSTRAINT "orders_products_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

####  Table "public.orders"
  Column  |         Type          | Collation | Nullable |                 Default
|-----------|------------|-----------|----------|-------------|
 id       | integer               |           | not null | nextval('orders_id_seq'::regclass)
 user_id  | integer               |           | not null | nextval('orders_user_id_seq'::regclass)
 status   | character varying(10) |           |          |

Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

####  Table "public.orders_products"
|Column     |  Type      | Collation | Nullable |    Default  |
|-----------|------------|-----------|----------|-------------|
|product_id | integer    |           | not null | nextval('orders_products_product_id_seq'::regclass)|
|user_id    | integer    |           | not null | nextval('orders_products_user_id_seq'::regclass)|
|quantity   | integer    |           |          |

Indexes:
    "orders_products_pkey" PRIMARY KEY, btree (product_id, order_id)
Foreign-key constraints:
    "orders_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "orders_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)