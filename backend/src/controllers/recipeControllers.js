const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const recipes = await tables.recipe.readAll();

    res.json(recipes);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const recipe = await tables.recipe.read(id);

    if (field && recipe && recipe[field]) {
      res.json({ [field]: recipe[field] });
    } else if (recipe) {
      res.json(recipe);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res) => {
  const recipeId = req.params.id;

  try {
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

    const editedrecipe = await tables.recipe.read(recipeId);
    return res.json({ message: "Updated", recipe: editedrecipe });
  } catch (error) {
    console.error("Error updating recipe", error);
    return res.status(500).json({ message: "Error updating recipe" });
  }
};

const add = async (req, res, next) => {
  const recipe = req.body;

  try {
    const insertId = await tables.recipe.create(recipe);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.recipe.delete(req.params.id);

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
