const express = require("express");
const { createUser, login, updatePassword } = require("../controladores/users");
const inputValidation = require("../middlewares/inputValidation");
const { loginSchema, createUserSchema } = require("../validations/userSchema");

const rotas = express();

rotas.post("/register", inputValidation(createUserSchema), createUser);
rotas.post("/login", inputValidation(loginSchema), login);
rotas.post("/updatepassword/:id", inputValidation(loginSchema), updatePassword);

module.exports = rotas;
