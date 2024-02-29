const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const contacts = await tables.contact.readAll();

    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const contact = await tables.contact.read(id);

    if (field && contact && contact[field]) {
      res.json({ [field]: contact[field] });
    } else if (contact) {
      res.json(contact);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res) => {
  const contactId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { email, object, message, is_read: IsRead } = req.body;

    const affectedRows = await tables.contact.edit(contactId, {
      email,
      object,
      message,
      IsRead,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedContact = await tables.contact.read(contactId);
    return res.json({ message: "Updated", contact: editedContact });
  } catch (error) {
    console.error("Error updating contact", error);
    return res.status(500).json({ message: "Error updating contact" });
  }
};

const add = async (req, res, next) => {
  const contact = req.body;

  try {
    const insertId = await tables.contact.create(contact);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.contact.delete(req.params.id);

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
