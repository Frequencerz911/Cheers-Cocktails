const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import Controllers module to manage item-related operations
const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/userControllers");

// Route to get a list of item/users/
router.get("/items", itemControllers.browse);
router.get("/users", userControllers.browse);

// Route to get a specific item/users/ by ID
router.get("/items/:id", itemControllers.read);
router.get("/users/:id", userControllers.read);
router.get("/users/:id/field", userControllers.read);

// Route to edit users/ by ID
router.put("/users/:id", userControllers.edit);

// Route to add a new item/users/
router.post("/items", itemControllers.add);
router.post("/users", userControllers.add);

// Route to delete an item/users/ by ID
router.delete("/users/:id", userControllers.destroy);

/* ************************************************************************* */

module.exports = router;
