// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all quantities from the database
    const quantities = await tables.quantity.readAll();

    // Respond with the quantities in JSON format
    res.json(quantities);
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

    // Fetch a specific quantity from the database based on the provided ID
    const quantity = await tables.quantity.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && quantity && quantity[field]) {
      res.json({ [field]: quantity[field] });
    } else if (quantity) {
      // If the quantity is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the quantity in JSON format
      res.json(quantity);
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
  const quantityId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { value, type_id: typeId } = req.body;

    // Edit quantity information directly using quantityManager
    const affectedRows = await tables.quantity.edit(quantityId, {
      value,
      typeId,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    // Fetch and return the updated quantity
    const editedquantity = await tables.quantity.read(quantityId);
    return res.json({ message: "Updated", quantity: editedquantity });
  } catch (error) {
    console.error("Error updating quantity", error);
    return res.status(500).json({ message: "Error updating quantity" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the quantity data from the request body
  const quantity = req.body;

  try {
    // Insert the quantity into the database
    const insertId = await tables.quantity.create(quantity);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted quantity
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the quantity from the database
    await tables.quantity.delete(req.params.id);

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
