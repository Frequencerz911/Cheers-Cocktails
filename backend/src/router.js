const express = require("express");

const router = express.Router();

/* ******************************* auth ****************************** */
const authControllers = require("./controllers/authControllers");

const { checkDatas } = require("./middlewares/auth");

router.post("/auth", checkDatas, authControllers.login);

/* ******************************* item ****************************** */
const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.post("/items", itemControllers.add);

/* ******************************* role ****************************** */
const roleControllers = require("./controllers/roleControllers");

router.get("/roles", roleControllers.browse);
router.get("/roles/:id", roleControllers.read);
router.get("/roles/:id/field", roleControllers.read);
router.put("/roles/:id", roleControllers.edit);
router.post("/roles", roleControllers.add);
router.delete("/roles/:id", roleControllers.destroy);

/* ******************************* country ****************************** */
const countryControllers = require("./controllers/countryControllers");

router.get("/countries", countryControllers.browse);
router.get("/countries/:id", countryControllers.read);
router.get("/countries/:id/field", countryControllers.read);
router.put("/countries/:id", countryControllers.edit);
router.post("/countries", countryControllers.add);
router.delete("/countries/:id", countryControllers.destroy);

/* ******************************* category ****************************** */
const categoryControllers = require("./controllers/categoryControllers");

router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.get("/categories/:id/field", categoryControllers.read);
router.put("/categories/:id", categoryControllers.edit);
router.post("/categories", categoryControllers.add);
router.delete("/categories/:id", categoryControllers.destroy);

/* ******************************* User ****************************** */
const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.get("/users/:id/field", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

/* ******************************* recipe ****************************** */
const recipeControllers = require("./controllers/recipeControllers");

router.get("/recipes", recipeControllers.browse);
router.get("/recipes/:id", recipeControllers.read);
router.get("/recipes/:id/field", recipeControllers.read);
router.put("/recipes/:id", recipeControllers.edit);
router.post("/recipes", recipeControllers.add);
router.delete("/recipes/:id", recipeControllers.destroy);

/* ******************************* comment ****************************** */
const commentControllers = require("./controllers/commentControllers");

router.get("/comments", commentControllers.browse);
router.get("/comments/:id", commentControllers.read);
router.get("/comments/:id/field", commentControllers.read);
router.put("/comments/:id", commentControllers.edit);
router.post("/comments", commentControllers.add);
router.delete("/comments/:id", commentControllers.destroy);

/* ******************************* topic ****************************** */
const topicControllers = require("./controllers/topicControllers");

router.get("/topics", topicControllers.browse);
router.get("/topics/:id", topicControllers.read);
router.get("/topics/:id/field", topicControllers.read);
router.put("/topics/:id", topicControllers.edit);
router.post("/topics", topicControllers.add);
router.delete("/topics/:id", topicControllers.destroy);

/* ******************************* type ****************************** */
const typeControllers = require("./controllers/typeControllers");

router.get("/types", typeControllers.browse);
router.get("/types/:id", typeControllers.read);
router.get("/types/:id/field", typeControllers.read);
router.put("/types/:id", typeControllers.edit);
router.post("/types", typeControllers.add);
router.delete("/types/:id", typeControllers.destroy);

/* ******************************* quantity ****************************** */
const quantityControllers = require("./controllers/quantityControllers");

router.get("/quantities", quantityControllers.browse);
router.get("/quantities/:id", quantityControllers.read);
router.get("/quantities/:id/field", quantityControllers.read);
router.put("/quantities/:id", quantityControllers.edit);
router.post("/quantities", quantityControllers.add);
router.delete("/quantities/:id", quantityControllers.destroy);

/* ******************************* ingredient ****************************** */
const ingredientControllers = require("./controllers/ingredientControllers");

router.get("/ingredients", ingredientControllers.browse);
router.get("/ingredients/:id", ingredientControllers.read);
router.get("/ingredients/:id/field", ingredientControllers.read);
router.put("/ingredients/:id", ingredientControllers.edit);
router.post("/ingredients", ingredientControllers.add);
router.delete("/ingredients/:id", ingredientControllers.destroy);

/* ******************************* recipe Ingredient Quantity ****************************** */
const recipeIngredientQuantityControllers = require("./controllers/recipeIngredientQuantityControllers");

router.get(
  "/recipesIngredientsQuantities",
  recipeIngredientQuantityControllers.browse
);
router.get(
  "/recipesIngredientsQuantities/:id",
  recipeIngredientQuantityControllers.read
);
router.get(
  "/recipesIngredientsQuantities/:id/field",
  recipeIngredientQuantityControllers.read
);
router.put(
  "/recipesIngredientsQuantities/:id",
  recipeIngredientQuantityControllers.edit
);
router.post(
  "/recipesIngredientsQuantities",
  recipeIngredientQuantityControllers.add
);
router.delete(
  "/recipesIngredientsQuantities/:id",
  recipeIngredientQuantityControllers.destroy
);

/* ******************************* menu ****************************** */
const menuControllers = require("./controllers/menuControllers");

router.get("/menus", menuControllers.browse);
router.get("/menus/:id", menuControllers.read);
router.get("/menus/:id/field", menuControllers.read);
router.put("/menus/:id", menuControllers.edit);
router.post("/menus", menuControllers.add);
router.delete("/menus/:id", menuControllers.destroy);

/* ******************************* menu Recipe ****************************** */
const menuRecipeControllers = require("./controllers/menuRecipeControllers");

router.get("/menusrecipes", menuRecipeControllers.browse);
router.get("/menusrecipes/:id", menuRecipeControllers.read);
router.get("/menusrecipes/:id/field", menuRecipeControllers.read);
router.put("/menusrecipes/:id", menuRecipeControllers.edit);
router.post("/menusrecipes", menuRecipeControllers.add);
router.delete("/menusrecipes/:id", menuRecipeControllers.destroy);

/* ******************************* contact ****************************** */
const contactControllers = require("./controllers/contactControllers");

router.get("/contacts", contactControllers.browse);
router.get("/contacts/:id", contactControllers.read);
router.get("/contacts/:id/field", contactControllers.read);
router.put("/contacts/:id", contactControllers.edit);
router.post("/contacts", contactControllers.add);
router.delete("/contacts/:id", contactControllers.destroy);

/* ************************************************************************* */

module.exports = router;
