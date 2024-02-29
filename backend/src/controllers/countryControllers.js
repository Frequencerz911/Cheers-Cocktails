const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const countries = await tables.country.readAll();

    res.json(countries);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const country = await tables.country.read(id);

    if (field && country && country[field]) {
      res.json({ [field]: country[field] });
    } else if (country) {
      res.json(country);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res) => {
  const countryId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { name } = req.body;

    const affectedRows = await tables.country.edit(countryId, {
      name,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedcountry = await tables.country.read(countryId);
    return res.json({ message: "Updated", country: editedcountry });
  } catch (error) {
    console.error("Error updating country", error);
    return res.status(500).json({ message: "Error updating country" });
  }
};

const add = async (req, res, next) => {
  const country = req.body;

  try {
    const insertId = await tables.country.create(country);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.country.delete(req.params.id);

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
