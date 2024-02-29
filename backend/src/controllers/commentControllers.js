const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const comments = await tables.comment.readAll();

    res.json(comments);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const comment = await tables.comment.read(id);

    if (field && comment && comment[field]) {
      res.json({ [field]: comment[field] });
    } else if (comment) {
      res.json(comment);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res) => {
  const commentId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { content, recipe_id: recipeId, user_id: userId } = req.body;

    const affectedRows = await tables.comment.edit(commentId, {
      content,
      recipeId,
      userId,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedcomment = await tables.comment.read(commentId);
    return res.json({ message: "Updated", comment: editedcomment });
  } catch (error) {
    console.error("Error updating comment", error);
    return res.status(500).json({ message: "Error updating comment" });
  }
};

const add = async (req, res, next) => {
  const comment = req.body;

  try {
    const insertId = await tables.comment.create(comment);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.comment.delete(req.params.id);

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
