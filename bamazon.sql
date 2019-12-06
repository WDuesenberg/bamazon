DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity DECIMAL(10,4) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (271, "gucci sweater", "clothing", 678.93, 31);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (374, "mango juul pods", "illegal", 111.23, 409);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (079, "Phd. barbie doll", "toys", 37.6, 7);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (690, "17' MacBook Air", "electronics", 845.99, 1);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (233, "Pokemon Ball", "?????", 4000.01, 8);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (504, "Callaway Golf 3wd", "sports", 134.97, 27);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (768, "72 LG TV", "electronics", 2270.49, 66);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (881, "family sz funyuns", "food", 46.8, 125);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (05, "cuisinart air fryer", "appliances", 300.00, 23);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (111, "Bob Ross: Stop Sucking!", "literature", 211.00, 0);

SELECT * FROM products;


