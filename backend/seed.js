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
