/* ************************************************************************* */
// Register Data Managers for Tables
/* ************************************************************************* */

// Import the manager modules responsible for handling data operations on the tables
const ItemManager = require("./models/ItemManager");
const RoleManager = require("./models/RoleManager");
const CountryManager = require("./models/CountryManager");
const CategoryManager = require("./models/CategoryManager");
const UserManager = require("./models/UserManager");
const RecipeManager = require("./models/RecipeManager");
const CommentManager = require("./models/CommentManager");
const TopicManager = require("./models/TopicManager");
const TypeManager = require("./models/TypeManager");
const QuantityManager = require("./models/QuantityManager");
const IngredientManager = require("./models/IngredientManager");
const RecipeIngredientQuantityManager = require("./models/RecipeIngredientQuantityManager");
const ContactManager = require("./models/ContactManager");

const managers = [
  ItemManager,
  RoleManager,
  CountryManager,
  CategoryManager,
  UserManager,
  RecipeManager,
  CommentManager,
  TopicManager,
  TypeManager,
  QuantityManager,
  IngredientManager,
  RecipeIngredientQuantityManager,
  ContactManager,
  // Add other managers here
];

// Create an empty object to hold data managers for different tables
const tables = {};

// Register each manager as data access point for its table
managers.forEach((ManagerClass) => {
  const manager = new ManagerClass();

  tables[manager.table] = manager;
});

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
