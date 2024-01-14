// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const category = await tables.category.readAll();
    res.json(category);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const categories = await tables.category.read(id);

    if (field && categories && categories[field]) {
      res.json({ [field]: categories[field] });
    } else if (categories) {
      res.json(categories);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  const categoriesId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "The request body is empty." });
    }

    const { name, is_alcool: IsAlcool } = req.body;

    const affectedRows = await tables.category.edit(categoriesId, {
      name,
      IsAlcool,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update failed" });
    }

    const editedcategories = await tables.category.read(categoriesId);
    return res.json({
      message: "Successful update",
      categories: editedcategories,
    });
  } catch (error) {
    console.error("User update error", error);
    return res.status(500).json({ message: "User update error" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const categories = req.body;

  try {
    const insertId = await tables.category.create(categories);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.category.delete(req.params.id);

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
