const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const menusRecipes = await tables.menu_recipe.readAll();

    res.json(menusRecipes);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const menuRecipe = await tables.menu_recipe.read(id);

    if (field && menuRecipe && menuRecipe[field]) {
      res.json({ [field]: menuRecipe[field] });
    } else if (menuRecipe) {
      res.json(menuRecipe);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res) => {
  const menuRecipeId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { menu_id: menuId, recipe_id: recipeId } = req.body;

    const affectedRows = await tables.menu_recipe.edit(menuRecipeId, {
      menuId,
      recipeId,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedmenuRecipe = await tables.menu_recipe.read(menuRecipeId);
    return res.json({ message: "Updated", menuRecipe: editedmenuRecipe });
  } catch (error) {
    console.error("Error updating menuRecipe", error);
    return res.status(500).json({ message: "Error updating menuRecipe" });
  }
};

const add = async (req, res, next) => {
  const menuRecipe = req.body;

  try {
    const insertId = await tables.menu_recipe.create(menuRecipe);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.menu_recipe.delete(req.params.id);

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
