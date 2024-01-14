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
