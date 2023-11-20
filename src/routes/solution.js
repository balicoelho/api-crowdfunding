const express = require("express");
const tokenValidation = require("../middlewares/tokenValidation");
const {
  createSolution,
  getSolution,
  updateSolution,
  deleteSolution,
} = require("../controladores/solution");
const inputValidation = require("../middlewares/inputValidation");
const {
  createSolutionSchema,
  updateSolutionSchema,
} = require("../validations/solutionSchema");

const rotas = express();

rotas.use(tokenValidation);

rotas.post(
  "/solution/:problem_id",
  inputValidation(createSolutionSchema),
  createSolution
);
rotas.get("/solution/:id", getSolution);
rotas.put(
  "/solution/:id",
  inputValidation(updateSolutionSchema),
  updateSolution
);
rotas.delete("/solution/:id", deleteSolution);

module.exports = rotas;
