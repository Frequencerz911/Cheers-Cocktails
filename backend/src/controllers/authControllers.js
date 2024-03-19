const { hash, verify, argon2id } = require("argon2");

const jwt = require("jsonwebtoken");

const tables = require("../tables");

const add = (req, res) => {
  const { password } = req.body;

  const hashingOptions = {
    type: argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };

  hash(password, hashingOptions).then((hashPassword) => {
    const user = { ...req.body, hashPassword };

    tables.user
      .create(user)
      .then((rows) => {
        if (rows !== undefined) {
          return res.status(201).json({ success: "User saved!" });
        }
        return res.status(403).json({ error: "An error has occured!" });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  });
};

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

      // .cookie("user token", token, {
      // httpOnly: true,
      // });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  add,
  login,
};
