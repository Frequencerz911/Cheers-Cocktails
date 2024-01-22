// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all comments from the database
    const comments = await tables.comment.readAll();

    // Respond with the comments in JSON format
    res.json(comments);
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

    // Fetch a specific comment from the database based on the provided ID
    const comment = await tables.comment.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && comment && comment[field]) {
      res.json({ [field]: comment[field] });
    } else if (comment) {
      // If the comment is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the comment in JSON format
      res.json(comment);
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
  const commentId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { content, recipe_id: recipeId, user_id: userId } = req.body;

    // Edit comment information directly using commentManager
    const affectedRows = await tables.comment.edit(commentId, {
      content,
      recipeId,
      userId,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    // Fetch and return the updated comment
    const editedcomment = await tables.comment.read(commentId);
    return res.json({ message: "Updated", comment: editedcomment });
  } catch (error) {
    console.error("Error updating comment", error);
    return res.status(500).json({ message: "Error updating comment" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the comment data from the request body
  const comment = req.body;

  try {
    // Insert the comment into the database
    const insertId = await tables.comment.create(comment);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted comment
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the comment from the database
    await tables.comment.delete(req.params.id);

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
