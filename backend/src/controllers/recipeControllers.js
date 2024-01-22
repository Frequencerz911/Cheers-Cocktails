// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all recipes from the database
    const recipes = await tables.recipe.readAll();

    // Respond with the recipes in JSON format
    res.json(recipes);
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

    // Fetch a specific recipe from the database based on the provided ID
    const recipe = await tables.recipe.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && recipe && recipe[field]) {
      res.json({ [field]: recipe[field] });
    } else if (recipe) {
      // If the recipe is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the recipe in JSON format
      res.json(recipe);
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
  const recipeId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const {
      title,
      difficulty,
      preparation_time: preparationTime,
      is_shared: isShared,
      is_approved: isApproved,
      video,
      user_id: userId,
      category_id: categoryId,
      country_id: countryId,
    } = req.body;

    // Edit recipe information directly using recipeManager
    const affectedRows = await tables.recipe.edit(recipeId, {
      title,
      difficulty,
      preparationTime,
      isShared,
      isApproved,
      video,
      userId,
      categoryId,
      countryId,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    // Fetch and return the updated recipe
    const editedrecipe = await tables.recipe.read(recipeId);
    return res.json({ message: "Updated", recipe: editedrecipe });
  } catch (error) {
    console.error("Error updating recipe", error);
    return res.status(500).json({ message: "Error updating recipe" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the recipe data from the request body
  const recipe = req.body;

  try {
    // Insert the recipe into the database
    const insertId = await tables.recipe.create(recipe);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted recipe
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the recipe from the database
    await tables.recipe.delete(req.params.id);

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
