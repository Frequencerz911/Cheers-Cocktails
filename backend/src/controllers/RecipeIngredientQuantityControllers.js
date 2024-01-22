// Import accerecipe_ingredient_quantits to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all recipesIngredientsQuantities from the database
    const recipesIngredientsQuantities =
      await tables.recipe_ingredient_quantity.readAll();

    // Respond with the recipesIngredientsQuantities in JSON format
    res.json(recipesIngredientsQuantities);
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

    // Fetch a specific recipeIngredientQuantity from the database based on the provided ID
    const recipeIngredientQuantity =
      await tables.recipe_ingredient_quantity.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && recipeIngredientQuantity && recipeIngredientQuantity[field]) {
      res.json({ [field]: recipeIngredientQuantity[field] });
    } else if (recipeIngredientQuantity) {
      // If the recipeIngredientQuantity is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the recipeIngredientQuantity in JSON format
      res.json(recipeIngredientQuantity);
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
  const recipeIngredientQuantityId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const {
      recipe_id: recipeId,
      ingredient_id: ingredientId,
      quantity_id: quantityId,
    } = req.body;

    // Edit recipeIngredientQuantity information directly using recipeIngredientQuantityManager
    const affectedRows = await tables.recipe_ingredient_quantity.edit(
      recipeIngredientQuantityId,
      {
        recipeId,
        ingredientId,
        quantityId,
      }
    );

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    // Fetch and return the updated recipeIngredientQuantity
    const editedrecipeIngredientQuantity =
      await tables.recipe_ingredient_quantity.read(recipeIngredientQuantityId);
    return res.json({
      message: "Updated",
      recipeIngredientQuantity: editedrecipeIngredientQuantity,
    });
  } catch (error) {
    console.error("Error updating recipeIngredientQuantity", error);
    return res
      .status(500)
      .json({ message: "Error updating recipeIngredientQuantity" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the recipeIngredientQuantity data from the request body
  const recipeIngredientQuantity = req.body;

  try {
    // Insert the recipeIngredientQuantity into the database
    const insertId = await tables.recipe_ingredient_quantity.create(
      recipeIngredientQuantity
    );

    // Respond with HTTP 201 (Created) and the ID of the newly inserted recipeIngredientQuantity
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the recipeIngredientQuantity from the database
    await tables.recipe_ingredient_quantity.delete(req.params.id);

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
