DROP DATABASE IF EXISTS dreamazon_db;

CREATE DATABASE dreamazon_db;

USE dreamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name  VARCHAR(100) NOT NULL,
  department_name VARCHAR (100) NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales DECIMAL(10,2) NOT NULL ,
  PRIMARY KEY ( item_id )
);

CREATE TABLE departments (
  department_id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VAlUES("Computer", "Electronics", 120.99, 4),
  ("Catan", 'Games', 59.99, 19),
  ("X-Box Gaming Console", "Electronics", 299.99, 20),
  ("Cards", "Games",12.32, 21),
  ("Black Dress Shirt", "Attire", 22.11, 12),
  ("Overwatch Hoodie", "Attire", 35.45, 13),
  ("Deadpool", "Movie", 29.99, 32),
  ("One Flew Over the Chucko's Nest", "Movie", 19.99, 52),
  ("Camping Chair", "Accessories", 13.99, 2),
  ("Marvel Poster", "Accessories", 5.99, 14);


INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 5000),
  ("Games", 3000),
  ("Movie", 1200),
  ("Attire", 3900),
  ("Accessories", 2000);
