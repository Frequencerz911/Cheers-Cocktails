const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const ingredients = await tables.ingredient.readAll();

    res.json(ingredients);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const ingredient = await tables.ingredient.read(id);

    if (field && ingredient && ingredient[field]) {
      res.json({ [field]: ingredient[field] });
    } else if (ingredient) {
      res.json(ingredient);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res) => {
  const ingredientId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { name } = req.body;

    const affectedRows = await tables.ingredient.edit(ingredientId, {
      name,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedingredient = await tables.ingredient.read(ingredientId);
    return res.json({ message: "Updated", ingredient: editedingredient });
  } catch (error) {
    console.error("Error updating ingredient", error);
    return res.status(500).json({ message: "Error updating ingredient" });
  }
};

const add = async (req, res, next) => {
  const ingredient = req.body;

  try {
    const insertId = await tables.ingredient.create(ingredient);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.ingredient.delete(req.params.id);

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
