const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const recipesIngredientsQuantities =
      await tables.recipe_ingredient_quantity.readAll();

    res.json(recipesIngredientsQuantities);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const recipeIngredientQuantity =
      await tables.recipe_ingredient_quantity.read(id);

    if (field && recipeIngredientQuantity && recipeIngredientQuantity[field]) {
      res.json({ [field]: recipeIngredientQuantity[field] });
    } else if (recipeIngredientQuantity) {
      res.json(recipeIngredientQuantity);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res) => {
  const recipeIngredientQuantityId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const {
      recipe_id: recipeId,
      ingredient_id: ingredientId,
      quantity_id: quantityId,
    } = req.body;

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

const add = async (req, res, next) => {
  const recipeIngredientQuantity = req.body;

  try {
    const insertId = await tables.recipe_ingredient_quantity.create(
      recipeIngredientQuantity
    );

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.recipe_ingredient_quantity.delete(req.params.id);

    res.sendStatus(204);
  } catch (err) {
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
