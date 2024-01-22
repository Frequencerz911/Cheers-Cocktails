// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all menus from the database
    const menus = await tables.menu.readAll();

    // Respond with the menus in JSON format
    res.json(menus);
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

    // Fetch a specific menu from the database based on the provided ID
    const menu = await tables.menu.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && menu && menu[field]) {
      res.json({ [field]: menu[field] });
    } else if (menu) {
      // If the menu is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the menu in JSON format
      res.json(menu);
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
  const menuId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const {
      name,
      is_shared: isShared,
      is_approved: isApproved,
      topic_id: topicId,
    } = req.body;

    // Edit menu information directly using menuManager
    const affectedRows = await tables.menu.edit(menuId, {
      name,
      isShared,
      isApproved,
      topicId,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    // Fetch and return the updated menu
    const editedmenu = await tables.menu.read(menuId);
    return res.json({ message: "Updated", menu: editedmenu });
  } catch (error) {
    console.error("Error updating menu", error);
    return res.status(500).json({ message: "Error updating menu" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the menu data from the request body
  const menu = req.body;

  try {
    // Insert the menu into the database
    const insertId = await tables.menu.create(menu);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted menu
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the menu from the database
    await tables.menu.delete(req.params.id);

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
