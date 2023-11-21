const knex = require("../database");

const createSolution = async (req, res) => {
  let solution = req.body;
  const { problem_id } = req.params;
  const { id: user_id } = req.user;

  try {
    const problemExist = await knex("problems")
      .where({ id: problem_id })
      .first();

    if (!problemExist || problemExist.user_id != req.user.id) {
      return res.status(404).json({ message: "Problem not found" });
    }

    solution = { problem_id, user_id, ...solution };

    const newSolution = await knex("solutions").insert(solution).returning("*");

    return res
      .status(201)
      .json({ author: req.user.fullname, ...newSolution[0] });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getSolution = async (req, res) => {
  const { id } = req.params;
  try {
    const solution = await knex("solutions").where({ id }).first();
    if (!solution || solution.user_id != req.user.id) {
      return res.status(404).json({ message: "Solution not found" });
    }

    return res.status(200).json(solution);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateSolution = async (req, res) => {
  let solution = req.body;
  const { id } = req.params;

  try {
    const solutionExist = await knex("solutions").where({ id }).first();
    if (!solutionExist || solutionExist.user_id != req.user.id) {
      return res.status(404).json({ message: "Solution not found" });
    }

    const solutionUpdated = await knex("solutions")
      .update(solution)
      .where({ id })
      .returning("*");

    return res.status(200).json(solutionUpdated);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteSolution = async (req, res) => {
  const { id } = req.params;
  try {
    const solutionExist = await knex("solutions").where({ id }).first();

    if (!solutionExist || solutionExist.user_id != req.user.id) {
      return res.status(404).json({ message: "Solution not found" });
    }

    await knex("solutions").del().where({ id });

    return res.status(200).json({ message: "Solution deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const createVote = async (req, res) => {
  const { id } = req.params;
  try {
    const solutionExist = await knex("solution").where({ id }).first();
    if (!solutionExist) {
      return res.status(404).json({ message: "Solution not found" });
    }

    await knex("votes").insert({ user_id: req.user.id, solution_id: id });
    return res.status(404).json({ message: "Solution voted with success" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  createSolution,
  deleteSolution,
  getSolution,
  updateSolution,
  createVote,
};
