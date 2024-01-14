// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all contacts from the database
    const contacts = await tables.contact.readAll();

    // Respond with the contacts in JSON format
    res.json(contacts);
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

    // Fetch a specific contact from the database based on the provided ID
    const contact = await tables.contact.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && contact && contact[field]) {
      res.json({ [field]: contact[field] });
    } else if (contact) {
      // If the contact is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the contact in JSON format
      res.json(contact);
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
  const contactId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { email, object, message, is_read: IsRead } = req.body;

    // Edit contact information directly using ContactManager
    const affectedRows = await tables.contact.edit(contactId, {
      email,
      object,
      message,
      IsRead,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    // Fetch and return the updated contact
    const editedContact = await tables.contact.read(contactId);
    return res.json({ message: "Updated", contact: editedContact });
  } catch (error) {
    console.error("Error updating contact", error);
    return res.status(500).json({ message: "Error updating contact" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the contact data from the request body
  const contact = req.body;

  try {
    // Insert the contact into the database
    const insertId = await tables.contact.create(contact);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted contact
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the contact from the database
    await tables.contact.delete(req.params.id);

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
