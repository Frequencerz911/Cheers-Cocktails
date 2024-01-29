const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const user = await tables.user.read(id);

    if (field && user && user[field]) {
      res.json({ [field]: user[field] });
    } else if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res) => {
  const userId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const {
      firstname,
      lastname,
      nickname,
      email,
      password,
      avatar,
      date_account_created: dateAccountCreated,
      is_admin: isAdmin,
      role_id: roleId,
    } = req.body;

    const affectedRows = await tables.user.edit(userId, {
      firstname,
      lastname,
      nickname,
      email,
      password,
      avatar,
      dateAccountCreated,
      isAdmin,
      roleId,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedUser = await tables.user.read(userId);
    return res.json({ message: "Updated", user: editedUser });
  } catch (error) {
    console.error("Error updating user", error);
    return res.status(500).json({ message: "Error updating user" });
  }
};

const add = async (req, res, next) => {
  const user = req.body;

  try {
    const insertId = await tables.user.create(user);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.user.delete(req.params.id);

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
