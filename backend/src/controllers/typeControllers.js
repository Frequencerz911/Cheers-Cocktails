// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all types from the database
    const types = await tables.type.readAll();

    // Respond with the types in JSON format
    res.json(types);
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

    // Fetch a specific type from the database based on the provided ID
    const type = await tables.type.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && type && type[field]) {
      res.json({ [field]: type[field] });
    } else if (type) {
      // If the type is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the type in JSON format
      res.json(type);
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
  const typeId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { type_name: typeName, unit } = req.body;

    // Edit type information directly using typeManager
    const affectedRows = await tables.type.edit(typeId, {
      typeName,
      unit,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    // Fetch and return the updated type
    const editedtype = await tables.type.read(typeId);
    return res.json({ message: "Updated", type: editedtype });
  } catch (error) {
    console.error("Error updating type", error);
    return res.status(500).json({ message: "Error updating type" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the type data from the request body
  const type = req.body;

  try {
    // Insert the type into the database
    const insertId = await tables.type.create(type);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted type
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the type from the database
    await tables.type.delete(req.params.id);

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
