// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all countries from the database
    const countries = await tables.country.readAll();

    // Respond with the countries in JSON format
    res.json(countries);
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

    // Fetch a specific country from the database based on the provided ID
    const country = await tables.country.read(id);

    // If the field parameter is present, respond with the specific field
    if (field && country && country[field]) {
      res.json({ [field]: country[field] });
    } else if (country) {
      // If the country is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the country in JSON format
      res.json(country);
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
  const countryId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { name } = req.body;

    // Edit country information directly using countryManager
    const affectedRows = await tables.country.edit(countryId, {
      name,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    // Fetch and return the updated country
    const editedcountry = await tables.country.read(countryId);
    return res.json({ message: "Updated", country: editedcountry });
  } catch (error) {
    console.error("Error updating country", error);
    return res.status(500).json({ message: "Error updating country" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the country data from the request body
  const country = req.body;

  try {
    // Insert the country into the database
    const insertId = await tables.country.create(country);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted country
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the country from the database
    await tables.country.delete(req.params.id);

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
