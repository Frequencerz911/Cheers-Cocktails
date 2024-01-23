const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const roles = await tables.role.readAll();

    res.json(roles);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const role = await tables.role.read(id);

    if (field && role && role[field]) {
      res.json({ [field]: role[field] });
    } else if (role) {
      res.json(role);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res) => {
  const roleId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { name } = req.body;

    const affectedRows = await tables.role.edit(roleId, {
      name,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedrole = await tables.role.read(roleId);
    return res.json({ message: "Updated", role: editedrole });
  } catch (error) {
    console.error("Error updating role", error);
    return res.status(500).json({ message: "Error updating role" });
  }
};

const add = async (req, res, next) => {
  const role = req.body;

  try {
    const insertId = await tables.role.create(role);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.role.delete(req.params.id);

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
