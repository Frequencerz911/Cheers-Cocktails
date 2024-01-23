const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const types = await tables.type.readAll();

    res.json(types);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const type = await tables.type.read(id);

    if (field && type && type[field]) {
      res.json({ [field]: type[field] });
    } else if (type) {
      res.json(type);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res) => {
  const typeId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { type_name: typeName, unit } = req.body;

    const affectedRows = await tables.type.edit(typeId, {
      typeName,
      unit,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedtype = await tables.type.read(typeId);
    return res.json({ message: "Updated", type: editedtype });
  } catch (error) {
    console.error("Error updating type", error);
    return res.status(500).json({ message: "Error updating type" });
  }
};

const add = async (req, res, next) => {
  const type = req.body;

  try {
    const insertId = await tables.type.create(type);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.type.delete(req.params.id);

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
