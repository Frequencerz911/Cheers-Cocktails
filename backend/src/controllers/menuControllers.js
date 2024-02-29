const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const menus = await tables.menu.readAll();

    res.json(menus);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const menu = await tables.menu.read(id);

    if (field && menu && menu[field]) {
      res.json({ [field]: menu[field] });
    } else if (menu) {
      res.json(menu);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res) => {
  const menuId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const {
      name,
      is_shared: isShared,
      is_approved: isApproved,
      topic_id: topicId,
    } = req.body;

    const affectedRows = await tables.menu.edit(menuId, {
      name,
      isShared,
      isApproved,
      topicId,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedmenu = await tables.menu.read(menuId);
    return res.json({ message: "Updated", menu: editedmenu });
  } catch (error) {
    console.error("Error updating menu", error);
    return res.status(500).json({ message: "Error updating menu" });
  }
};

const add = async (req, res, next) => {
  const menu = req.body;

  try {
    const insertId = await tables.menu.create(menu);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.menu.delete(req.params.id);

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
