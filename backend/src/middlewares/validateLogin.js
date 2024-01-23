const Joi = require("joi");

const checkDatas = (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
  }).validate(req.body, { abortEarly: false });

  if (error) {
    next();
  } else {
    res.status(400).json(error);
  }
};

module.exports = {
  checkDatas,
};
