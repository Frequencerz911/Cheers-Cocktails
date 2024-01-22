// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all roles from the database
    const roles = await tables.role.readAll();

    // Respond with the roles in JSON format
    res.json(roles);
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

    // Fetch a specific role from the database based on the provided ID
    const role = await tables.role.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && role && role[field]) {
      res.json({ [field]: role[field] });
    } else if (role) {
      // If the role is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the role in JSON format
      res.json(role);
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
  const roleId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { name } = req.body;

    // Edit role information directly using roleManager
    const affectedRows = await tables.role.edit(roleId, {
      name,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    // Fetch and return the updated role
    const editedrole = await tables.role.read(roleId);
    return res.json({ message: "Updated", role: editedrole });
  } catch (error) {
    console.error("Error updating role", error);
    return res.status(500).json({ message: "Error updating role" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the role data from the request body
  const role = req.body;

  try {
    // Insert the role into the database
    const insertId = await tables.role.create(role);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted role
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the role from the database
    await tables.role.delete(req.params.id);

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
