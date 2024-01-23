const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const quantities = await tables.quantity.readAll();

    res.json(quantities);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const quantity = await tables.quantity.read(id);

    if (field && quantity && quantity[field]) {
      res.json({ [field]: quantity[field] });
    } else if (quantity) {
      res.json(quantity);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res) => {
  const quantityId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { value, type_id: typeId } = req.body;

    const affectedRows = await tables.quantity.edit(quantityId, {
      value,
      typeId,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedquantity = await tables.quantity.read(quantityId);
    return res.json({ message: "Updated", quantity: editedquantity });
  } catch (error) {
    console.error("Error updating quantity", error);
    return res.status(500).json({ message: "Error updating quantity" });
  }
};

const add = async (req, res, next) => {
  const quantity = req.body;

  try {
    const insertId = await tables.quantity.create(quantity);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.quantity.delete(req.params.id);

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
