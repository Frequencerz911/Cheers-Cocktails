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

const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.get("/users/:id/field", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

const contactControllers = require("./controllers/contactControllers");

router.get("/contacts", contactControllers.browse);
router.get("/contacts/:id", contactControllers.read);
router.get("/contacts/:id/field", contactControllers.read);
router.put("/contacts/:id", contactControllers.edit);
router.post("/contacts", contactControllers.add);
router.delete("/contacts/:id", contactControllers.destroy);

const categoryControllers = require("./controllers/categoryControllers");

router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.get("/categories/:id/field", categoryControllers.read);
router.put("/categories/:id", categoryControllers.edit);
router.post("/categories", categoryControllers.add);
router.delete("/categories/:id", categoryControllers.destroy);

/* ************************************************************************* */

module.exports = router;
