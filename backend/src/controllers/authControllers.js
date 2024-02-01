const { verify } = require("argon2");
const jwt = require("jsonwebtoken");

const tables = require("../tables");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const users = await tables.user.readByEmail(email);
    if (users == null) {
      res.sendStatus(422);
      return;
    }

    const verified = await verify(users.hash_password, password);

    if (verified) {
      delete users.hash_password;
      const token = jwt.sign({ user_id: users.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  login,
};
