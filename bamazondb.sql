DROP DATABASE IF EXISTS bamazondb;
CREATE DATABASE bamazondb;
USE bamazondb;

CREATE TABLE products(
    item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    department_name VARCHAR(200) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(100) NOT NULL,
    PRIMARY KEY(item_id) 
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES
("Hasbro Guess Who Game", "Toys & Games", 15, 50),
("Nintendo Switch Pro Controller", "Games & Accessories", 59, 20),
("Sabrent 4-Port USB 2.0", "Electronics", 7, 100),
("Hanes Men's Ecosmart Fleece Sweatshirt", "Clothes", 15, 200),
("It's Not Easy Being a Bunny (Beginner Books(R)) ", "Books", 9, 100),
("50 Disposable Face Masks Surgical", "Health", 20, 60),
("Bushnell Falcon 10x50 Wide Angle Binoculars (Black)", "Sport", 32, 500),
("Mother [Explicit]", "Music", 32, 40),
("KitchenAid KC130OHAQA Classic Can Opener, One Size, Aqua Sky", "Home", 12, 20),
("Dog/Cat Water Station", "Pets", 50, 70);

SELECT * FROM products;



