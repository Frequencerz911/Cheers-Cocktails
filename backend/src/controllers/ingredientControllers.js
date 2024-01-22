// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all ingredients from the database
    const ingredients = await tables.ingredient.readAll();

    // Respond with the ingredients in JSON format
    res.json(ingredients);
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

    // Fetch a specific ingredient from the database based on the provided ID
    const ingredient = await tables.ingredient.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && ingredient && ingredient[field]) {
      res.json({ [field]: ingredient[field] });
    } else if (ingredient) {
      // If the ingredient is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the ingredient in JSON format
      res.json(ingredient);
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
  const ingredientId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { name } = req.body;

    // Edit ingredient information directly using ingredientManager
    const affectedRows = await tables.ingredient.edit(ingredientId, {
      name,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    // Fetch and return the updated ingredient
    const editedingredient = await tables.ingredient.read(ingredientId);
    return res.json({ message: "Updated", ingredient: editedingredient });
  } catch (error) {
    console.error("Error updating ingredient", error);
    return res.status(500).json({ message: "Error updating ingredient" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the ingredient data from the request body
  const ingredient = req.body;

  try {
    // Insert the ingredient into the database
    const insertId = await tables.ingredient.create(ingredient);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted ingredient
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the ingredient from the database
    await tables.ingredient.delete(req.params.id);

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
