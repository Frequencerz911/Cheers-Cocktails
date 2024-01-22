// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all menusRecipes from the database
    const menusRecipes = await tables.menu_recipe.readAll();

    // Respond with the menusRecipes in JSON format
    res.json(menusRecipes);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    // Fetch a specific menuRecipe from the database based on the provided ID
    const menuRecipe = await tables.menu_recipe.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && menuRecipe && menuRecipe[field]) {
      res.json({ [field]: menuRecipe[field] });
    } else if (menuRecipe) {
      // If the menuRecipe is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the menuRecipe in JSON format
      res.json(menuRecipe);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  const menuRecipeId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { menu_id: menuId, recipe_id: recipeId } = req.body;

    // Edit menuRecipe information directly using menuRecipeManager
    const affectedRows = await tables.menu_recipe.edit(menuRecipeId, {
      menuId,
      recipeId,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    // Fetch and return the updated menuRecipe
    const editedmenuRecipe = await tables.menu_recipe.read(menuRecipeId);
    return res.json({ message: "Updated", menuRecipe: editedmenuRecipe });
  } catch (error) {
    console.error("Error updating menuRecipe", error);
    return res.status(500).json({ message: "Error updating menuRecipe" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the menuRecipe data from the request body
  const menuRecipe = req.body;

  try {
    // Insert the menuRecipe into the database
    const insertId = await tables.menu_recipe.create(menuRecipe);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted menuRecipe
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the menuRecipe from the database
    await tables.menu_recipe.delete(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
