const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const Topics = await tables.Topic.readAll();

    res.json(Topics);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const Topic = await tables.Topic.read(id);

    if (field && Topic && Topic[field]) {
      res.json({ [field]: Topic[field] });
    } else if (Topic) {
      res.json(Topic);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res) => {
  const TopicId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { name } = req.body;

    const affectedRows = await tables.Topic.edit(TopicId, {
      name,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedTopic = await tables.Topic.read(TopicId);
    return res.json({ message: "Updated", Topic: editedTopic });
  } catch (error) {
    console.error("Error updating Topic", error);
    return res.status(500).json({ message: "Error updating Topic" });
  }
};

const add = async (req, res, next) => {
  const Topic = req.body;

  try {
    const insertId = await tables.Topic.create(Topic);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.Topic.delete(req.params.id);

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
