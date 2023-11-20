const express = require("express");
const {
  createProblem,
  getProblems,
  updateProblem,
  deleteProblem,
  getProblem,
  getProblemSolutions,
  postComment,
  deleteComment,
} = require("../controladores/problems");
const tokenValidation = require("../middlewares/tokenValidation");
const inputValidation = require("../middlewares/inputValidation");
const {
  createProblemSchema,
  updateProblemSchema,
} = require("../validations/problemSchema");

const rotas = express();

rotas.use(tokenValidation);

rotas.post("/", inputValidation(createProblemSchema), createProblem);
rotas.get("/", getProblems);
rotas.get("/:id", getProblem);
rotas.get("/:id/solutions", getProblemSolutions);
rotas.put("/:id", inputValidation(updateProblemSchema), updateProblem);
rotas.delete("/:id", deleteProblem);
rotas.post("/:id/comment", postComment);
rotas.delete("/:id/comment/:id_comment", deleteComment);

module.exports = rotas;
