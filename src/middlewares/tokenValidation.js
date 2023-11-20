const jwt = require("jsonwebtoken");
const knex = require("../database");

const tokenValidation = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Not authorized" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.TokenPassword);

    const user = await knex("users").where({ id }).first();

    if (!user) {
      return res.status(401).json({ mensagem: "Not authorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Not authorized" });
  }
};

module.exports = tokenValidation;
