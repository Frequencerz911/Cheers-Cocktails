DROP TABLE IF EXISTS contact;
DROP TABLE IF EXISTS menu_recipe;
DROP TABLE IF EXISTS menu;
DROP TABLE IF EXISTS recipe_ingredient_quantity;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS quantity;
DROP TABLE IF EXISTS type;
DROP TABLE IF EXISTS topic;
DROP TABLE IF EXISTS recipe;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS country;
DROP TABLE IF EXISTS role;


CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  role VARCHAR(90) NOT NULL);

CREATE TABLE country (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(20) NOT NULL);

CREATE TABLE category (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(90) NOT NULL,
  is_alcool BOOLEAN NOT NULL DEFAULT FALSE);

CREATE TABLE user (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  email VARCHAR(80) NOT NULL,
  password VARCHAR(150) NOT NULL,
  is_avatar BOOLEAN NOT NULL DEFAULT FALSE,
  confirmation_email BOOLEAN NOT NULL,
  date_account_created DATETIME NOT NULL, 
  last_connection DATETIME NOT NULL, 
  role_id INT NOT NULL DEFAULT 1,
  CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES role(id));

CREATE TABLE comment (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  content TEXT NOT NULL,
  date DATETIME NOT NULL,
  recipe_id INT NOT NULL,
  CONSTRAINT fk_comment_recipe FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  user_id INT NOT NULL
  CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES user(id));

CREATE TABLE recipe (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  difficulty INT NOT NULL,
  preparation_time VARCHAR(10) NOT NULL,
  is_shared BOOLEAN NOT NULL DEFAULT FALSE,
  is_approved BOOLEAN NOT NULL DEFAULT FALSE,
  video VARCHAR(150) NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_recipe_user FOREIGN KEY (user_id) REFERENCES user(id),
  category_id INT NOT NULL,
  CONSTRAINT fk_recipe_category FOREIGN KEY (category_id) REFERENCES category(id),
  country_id INT NOT NULL,
  CONSTRAINT fk_recipe_country FOREIGN KEY (country_id) REFERENCES country(id),
  comment_id INT NOT NULL,
  CONSTRAINT fk_recipe_comment FOREIGN KEY (comment_id) REFERENCES comment(id));

CREATE TABLE topic (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(90) NOT NULL);

CREATE TABLE type (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  type VARCHAR(10) NOT NULL,
  unit VARCHAR(5) NOT NULL);

CREATE TABLE quantity (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  value VARCHAR(10),
  type_id INT NOT NULL,
  CONSTRAINT fk_quantity_type FOREIGN KEY (type_id) REFERENCES type(id));  

CREATE TABLE ingredient (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(80) NOT NULL);

CREATE TABLE recipe_ingredient_quantity (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
recipe_id INT NOT NULL,
CONSTRAINT fk_recipe_ingredient_recipe FOREIGN KEY (recipe_id) REFERENCES recipe(id),
ingredient_id INT NOT NULL,
CONSTRAINT fk_recipe_ingredient_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredient(id),
quantity_id INT NOT NULL,
CONSTRAINT fk_recipe_quantity_quantity FOREIGN KEY (quantity_id) REFERENCES quantity(id));  

CREATE TABLE menu (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
  is_shared BOOLEAN NOT NULL
  is_approved BOOLEAN NOT NULL
  topic_id INT NOT NULL
  CONSTRAINT fk_menu_topic FOREIGN KEY (topic_id) REFERENCES topic(id));

CREATE TABLE menu_recipe (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  menu_id INT NOT NULL,
  CONSTRAINT fk_menu_recipe_menu FOREIGN KEY (menu_id) REFERENCES menu(id),
  recipe_id INT NOT NULL,
  CONSTRAINT fk_menu_recipe_recipe FOREIGN KEY (recipe_id) REFERENCES recipe(id));

CREATE TABLE contact (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  email VARCHAR(30) NOT NULL,
  object VARCHAR(60) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE);
