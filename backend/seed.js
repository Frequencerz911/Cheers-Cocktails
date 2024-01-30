/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Optional: Truncate tables (remove existing data)
    await database.query("DELETE FROM contact");
    await database.query("DELETE FROM menu_recipe");
    await database.query("DELETE FROM menu");
    await database.query("DELETE FROM recipe_ingredient_quantity");
    await database.query("DELETE FROM ingredient");
    await database.query("DELETE FROM quantity");
    await database.query("DELETE FROM type");
    await database.query("DELETE FROM topic");
    await database.query("DELETE FROM comment");
    await database.query("DELETE FROM recipe");
    await database.query("DELETE FROM user");
    await database.query("DELETE FROM category");
    await database.query("DELETE FROM country");
    await database.query("DELETE FROM role");

    queries.push(
      database.query(
        `INSERT INTO role (name) VALUES
        ('administrator'),
        ('moderator'),
        ('user')`
      )
    );

    for (let i = 0; i < 10; i += 1) {
      queries.push(
        database.query("INSERT INTO country (name) VALUES (?)", [
          faker.location.country(),
        ])
      );
    }

    queries.push(
      database.query(
        `INSERT INTO category (name) VALUES
          ('Boisson'),
          ('Nourriture')`
      )
    );

    queries.push(
      database.query(
        "INSERT INTO user(firstname, lastname, nickname, email, password, avatar, date_account_created, is_admin, role_id) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          "toto",
          "haricot",
          "thebest",
          "toto@gmail.com",
          "toto1234",
          "https://pixabay.com/fr/vectors/homme-personne-avatar-visage-156584/",
          "2024/01/29",
          true,
          1,
        ]
      )
    );

    queries.push(
      database.query(
        "INSERT INTO user(firstname, lastname, nickname, email, password, avatar, date_account_created, is_admin, role_id) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          "toto",
          "modo",
          "themodo",
          "toto.modo@gmail.com",
          "toto4321",
          "https://pixabay.com/fr/vectors/homme-personne-avatar-visage-156584/",
          "2024/01/30",
          true,
          2,
        ]
      )
    );

    for (let i = 0; i < 10; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO user(firstname, lastname, nickname, email, password, avatar, date_account_created, is_admin, role_id) VALUES (?,?,?,?,?,?,?,?,?)",
          [
            faker.person.firstName(),
            faker.person.lastName(),
            faker.lorem.word(),
            faker.internet.email(),
            faker.internet.password(),
            faker.image.avatar(),
            faker.date.past(),
            false,
            3,
          ]
        )
      );
    }

    queries.push(
      database.query(
        `INSERT INTO recipe (title, difficulty, preparation_time, is_shared, is_approved, video, user_id, category_id, country_id) VALUES ('Supreme Buddha Bowl', 2, '25min', true, true, "hthththth", 1, 1, 1)`
      )
    );
    for (let i = 0; i < 5; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO comment(content, date, recipe_id, user_id) VALUES (?,?,?,?)",
          [faker.lorem.word(), faker.date.past(), 1, 1]
        )
      );
    }

    queries.push(
      database.query(
        `INSERT INTO topic (name) VALUES
          ('Mariage'),
          ('Apéritif Dinatoire')`
      )
    );

    queries.push(
      database.query(
        `INSERT INTO type (type_name, unit) VALUES
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
        ('Huile olive'),
        ('Herbes de Provence'),
        ('Sel'),
        ('Poivre'),
        ('Huile de tournesol'),
        ('Salade'),
        ('Avocat'),
        ('Patate douce'),
        ('Petites tomates'),
        ('Pourpier'),
        ('Choux rouge'),
        ('Mangue'),
        ('Feuilles de salade'),
        ('Tomates');`
      )
    );

    queries.push(
      database.query(
        "INSERT INTO recipe_ingredient_quantity(recipe_id, ingredient_id, quantity_id) VALUES (?,?,?)",
        [1, 7, 1]
      )
    );

    queries.push(
      database.query(
        "INSERT INTO menu(name, is_shared, is_approved, topic_id) VALUES (?,?,?,?)",
        ["burger", true, true, 1]
      )
    );

    for (let i = 0; i < 10; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO contact(email, object, message, is_read) VALUES (?,?,?,?)",
          [
            faker.internet.email(),
            faker.lorem.word(),
            faker.lorem.paragraphs(5),
            false,
          ]
        )
      );
    }
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
