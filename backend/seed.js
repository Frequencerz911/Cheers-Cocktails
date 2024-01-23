/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Generating ROLES columns
    queries.push(
      database.query(
        `INSERT INTO role (role) VALUES
          ('user'),
          ('moderator'),
          ('administrator')`
      )
    );
    // Generating USERS columns
    queries.push(
      database.query(
        `INSERT INTO user (firstname, lastname, nickname, email, password, is_avatar, date_account_created, last_connection, role_id) VALUES
          ('Admin', 'istrator','administrator', 'administrator@email.com', 'blablabla', false, '2000-01-01', '2000-01-02', 3),
          ('Mode', 'rator', 'moderator', 'moderator@email.com', 'blebleble', false, '2010-01-01', '2010-01-02', 2),
          ('Use', 'R', 'user', 'user@email.com', 'bliblibli', false, '2015-01-01', '2015-01-02', 1)`
      )
    );
    // Generating CATEGORIES columns
    queries.push(
      database.query(
        `INSERT INTO category (name) VALUES
          ('Boisson'),
          ('Nourriture')`
      )
    );
    queries.push(
      database.query(
        `INSERT INTO country (name) VALUES
          ('France'),
          ('Angleterre'),
          ('Italie'),
          ('Russie'),
          ('États-Unis'),
          ('Maroc'),
          ('chine'),
          ('Japon'),
          ('Liban'),
          ('Thailand'),
          ('Vietnam'),
          ('Norvège')`
      )
    );
    queries.push(
      database.query(
        `INSERT INTO recipe (title, difficulty, preparation_time, is_shared, is_approved, video, user_id, category_id, country_id) VALUES ('Supreme Buddha Bowl', 2, '25min', 'true', 'true', "https://www.youtube.com/watch?v=Kc2fjylFIa4", 1, 1, 1)`
      )
    );
    queries.push(
      database.query(
        `INSERT INTO type (type, unit) VALUES
          ('number', ''),
          ('teaspoon', 'tsp'),
          ('tablespoon', 'tbsp'),
          ('cup', 'cup'),
          ('ml', 'ml'),
          ('l', 'l'),
          ('g', 'g'),
          ('to taste', '')`
      )
    );
    queries.push(
      database.query(
        `INSERT INTO quantity (value, type_id) VALUES
        ('1', 1),
        ('2', 1),
        ('3', 1),
        ('4', 1),
        ('5', 1),
        ('6', 1),
        ('7', 1),
        ('8', 1),
        ('9', 1),
        ('10', 1),
        ('1/4', 2),
        ('1/2', 2),
        ('1', 2),
        ('1/2', 3),
        ('1', 3),
        ('1/8', 4),
        ('1/4', 4),
        ('1/3', 4),
        ('1/2', 4),
        ('1', 4),
        ('5', 5),
        ('10', 5),
        ('15', 5),
        ('20', 5),
        ('25', 5),
        ('30', 5),
        ('40', 5),
        ('50', 5),
        ('60', 5),
        ('70', 5),
        ('80', 5),
        ('90', 5),
        ('100', 5),
        ('125', 5),
        ('150', 5),
        ('175', 5),
        ('200', 5),
        ('250', 5),
        ('300', 5),
        ('350', 5),
        ('400', 5),
        ('450', 5),
        ('500', 5),
        ('550', 5),
        ('600', 5),
        ('600', 5),
        ('700', 5),
        ('800', 5),
        ('1', 6),
        ('2', 6),
        ('3', 6),
        ('1', 7),
        ('2', 7),
        ('3', 7),
        ('4', 7),
        ('5', 7),
        ('6', 7),
        ('7', 7),
        ('8', 7),
        ('9', 7),
        ('10', 7),
        ('15', 7),
        ('20', 7),
        ('25', 7),
        ('30', 7),
        ('35', 7),
        ('40', 7),
        ('45', 7),
        ('50', 7),
        ('60', 7),
        ('70', 7),
        ('80', 7),
        ('90', 7),
        ('100', 7),
        ('150', 7),
        ('200', 7),
        ('250', 7),
        ('300', 7),
        ('350', 7),
        ('400', 7),
        ('450', 7),
        ('500', 7),
        ('600', 7),
        ('700', 7),
        ('800', 7),
        ('0', 8);`
      )
    );
    queries.push(
      database.query(
        `INSERT INTO ingredient (name) VALUES
        ('Pois'),
        ('Huile d'olive'),
        ('Herbes de Provence'),
        ('Sel'),
        ('Poivre'),
        ('Huile de tournesol'),
        ('Salade'),
        ('Avocat'),
        ('Patate douce'),
        ('Petites tomates'),
        ('Pourpier'),
        ('Chou rouge'),
        ('Mangue'),
        ('Feuilles de salade),
        ('Tomates');`
      )
    );
    queries.push(
      database.query(
        `INSERT INTO recipe_ingredient_quantity (recipe_id, ingredient_id, quantity_id) VALUES
        (1, 1, 82),
        (1, 2, 20),
        (1, 3, 20),
        (1, 4, 86),
        (2, 8, 1),
        (2, 1, 69),
        (2, 14, 2),
        (2, 15, 3),
        (2, 16, 2);`
      )
    );
    queries.push(
      database.query(
        `INSERT INTO contact (email, object, message, is_read) VALUES
        ("firstmail@mail.fr", "This is a first mail which is not read", "If this mail isn't marked as not read, then there is a big issue to resolve...", 0),
        ("secondmail@mail.fr", "This is a second mail which should be marked as read", "If this email isn't shown as read, then there are some issues to fix!", 1)`
      )
    );
    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
