const jwt = require("jsonwebtoken");
const knex = require("../database");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { email, password, fullname, birthdate, cellphone } = req.body;

  try {
    const userExists = await knex("users").where({ email }).first();

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await knex("users")
      .insert({
        email,
        password: hashPassword,
        fullname,
        birthdate,
        cellphone,
      })
      .returning(["id", "email", "fullname", "birthdate", "cellphone"]);

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await knex("users").where({ email }).first();
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.TokenPassword, {
      expiresIn: "8h",
    });
    const { password: _, ...logedUser } = user;

    return res.status(200).json({ ...logedUser, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updatePassword = async (req, res) => {
  const { email, password } = req.body;
  const { id } = req.params;

  try {
    const userExists = await knex("users").where({ id }).first();

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userExists && userExists.email !== email) {
      return res.status(400).json({ message: "Email incorrect" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const passwordUpdated = await knex("users")
      .update({
        password: hashPassword,
      })
      .where({ id })
      .returning(["id", "email", "fullname", "birthdate", "cellphone"]);

    return res.status(201).json(passwordUpdated);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { createUser, login, updatePassword };
