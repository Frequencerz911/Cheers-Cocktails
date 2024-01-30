const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const tables = require("../tables");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const [users] = await tables.user.readByEmail(email);

    if (users == null) {
      res.sendStatus(422);
      return;
    }
    const verified = await argon2.verify(users.hash_password, password);

    if (verified) {
      delete users.hash_password;

      const token = jwt.sign({ user_id: users.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res
        .status(200)
        .cookie("user_token", token, {
          httpOnly: true,
        })
        .json(users);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
