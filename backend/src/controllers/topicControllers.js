// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all Topics from the database
    const Topics = await tables.Topic.readAll();

    // Respond with the Topics in JSON format
    res.json(Topics);
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

    // Fetch a specific Topic from the database based on the provided ID
    const Topic = await tables.Topic.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && Topic && Topic[field]) {
      res.json({ [field]: Topic[field] });
    } else if (Topic) {
      // If the Topic is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the Topic in JSON format
      res.json(Topic);
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
  const TopicId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { name } = req.body;

    // Edit Topic information directly using TopicManager
    const affectedRows = await tables.Topic.edit(TopicId, {
      name,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    // Fetch and return the updated Topic
    const editedTopic = await tables.Topic.read(TopicId);
    return res.json({ message: "Updated", Topic: editedTopic });
  } catch (error) {
    console.error("Error updating Topic", error);
    return res.status(500).json({ message: "Error updating Topic" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the Topic data from the request body
  const Topic = req.body;

  try {
    // Insert the Topic into the database
    const insertId = await tables.Topic.create(Topic);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted Topic
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the Topic from the database
    await tables.Topic.delete(req.params.id);

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
