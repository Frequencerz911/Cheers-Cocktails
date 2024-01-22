const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.post("/items", itemControllers.add);

const roleControllers = require("./controllers/roleControllers");

router.get("/roles", roleControllers.browse);
router.get("/roles/:id", roleControllers.read);
router.get("/roles/:id/field", roleControllers.read);
router.put("/roles/:id", roleControllers.edit);
router.post("/roles", roleControllers.add);
router.delete("/roles/:id", roleControllers.destroy);

const countryControllers = require("./controllers/countryControllers");

router.get("/countries", countryControllers.browse);
router.get("/countries/:id", countryControllers.read);
router.get("/countries/:id/field", countryControllers.read);
router.put("/countries/:id", countryControllers.edit);
router.post("/countries", countryControllers.add);
router.delete("/countries/:id", countryControllers.destroy);

const categoryControllers = require("./controllers/categoryControllers");

router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.get("/categories/:id/field", categoryControllers.read);
router.put("/categories/:id", categoryControllers.edit);
router.post("/categories", categoryControllers.add);
router.delete("/categories/:id", categoryControllers.destroy);

const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.get("/users/:id/field", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

const recipeControllers = require("./controllers/recipeControllers");

router.get("/recipes", recipeControllers.browse);
router.get("/recipes/:id", recipeControllers.read);
router.get("/recipes/:id/field", recipeControllers.read);
router.put("/recipes/:id", recipeControllers.edit);
router.post("/recipes", recipeControllers.add);
router.delete("/recipes/:id", recipeControllers.destroy);

const commentControllers = require("./controllers/commentControllers");

router.get("/comments", commentControllers.browse);
router.get("/comments/:id", commentControllers.read);
router.get("/comments/:id/field", commentControllers.read);
router.put("/comments/:id", commentControllers.edit);
router.post("/comments", commentControllers.add);
router.delete("/comments/:id", commentControllers.destroy);

const contactControllers = require("./controllers/contactControllers");

router.get("/contacts", contactControllers.browse);
router.get("/contacts/:id", contactControllers.read);
router.get("/contacts/:id/field", contactControllers.read);
router.put("/contacts/:id", contactControllers.edit);
router.post("/contacts", contactControllers.add);
router.delete("/contacts/:id", contactControllers.destroy);

/* ************************************************************************* */

module.exports = router;
