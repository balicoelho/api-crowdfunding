const knex = require("../database");

const createProblem = async (req, res) => {
  let problem = req.body;

  try {
    const newAdress = await knex("addresses")
      .insert(problem.address)
      .returning("id");

    const { address, ...problemWithoutAddress } = problem;
    problem = {
      address_id: newAdress[0].id,
      ...problemWithoutAddress,
      user_id: req.user.id,
    };

    const newProblem = await knex("problems")
      .insert(problem)
      .returning(["id", "title", "description", "imgUrl", "deadline", "pix"]);

    return res.status(201).json({
      author: req.user.fullname,
      ...newProblem[0],
      address: { ...address },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getProblems = async (req, res) => {
  try {
    const problems = await knex("problems");

    for (const problem of problems) {
      author = await knex("users")
        .where({ id: problem.user_id })
        .select("fullname")
        .first();
      problem.author = author.fullname;
      problem.address = await knex("addresses")
        .where({
          id: problem.address_id,
        })
        .first();
      problem.solutions = await knex("solutions").where({
        problem_id: problem.id,
      });
    }

    return res.status(200).json(problems);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getProblem = async (req, res) => {
  const { id } = req.params;
  try {
    const problemExist = await knex("problems").where({ id }).first();
    if (!problemExist) {
      return res.status(404).json({ message: "Problem not found" });
    }

    problemExist.address = await knex("addresses")
      .where({
        id: problemExist.address_id,
      })
      .first();

    const solutions = await knex("solutions").where({ problem_id: id });
    for (const solution of solutions) {
      const votes = await knex("votes")
        .where({ solutions_id: solution.id })
        .count("*");
      solution.votes = votes[0].count;
      const votedByUser = await knex("votes")
        .where({ solutions_id: solution.id })
        .first();
      votedByUser && votedByUser.user_id === req.user.id
        ? (solution.votedByUser = true)
        : (solution.votedByUser = false);
    }

    problemExist.solutions = solutions;

    const comments = await knex("comments").where({ problem_id: id });
    problemExist.comments = comments;

    return res.status(200).json(problemExist);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getProblemSolutions = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await knex("problems").where({ id }).first();
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const solutions = await knex("solutions").where({ problem_id: id });
    for (const solution of solutions) {
      const author = await knex("users")
        .where({ id: solution.user_id })
        .select("fullname");
      solution.author = author[0].fullname;
    }

    return res.status(200).json(solutions);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateProblem = async (req, res) => {
  let problem = req.body;
  const { id } = req.params;

  try {
    const problemExist = await knex("problems").where({ id }).first();
    if (!problemExist || problemExist.user_id != req.user.id) {
      return res.status(404).json({ message: "Problem not found" });
    }

    if (problem.address) {
      await knex("addresses")
        .where({
          id: problemExist.address_id,
        })
        .update(problem.address);
    }

    const { address, ...problemWithoutAddress } = problem;

    const problemUpdated = await knex("problems")
      .update(problemWithoutAddress)
      .where({ id })
      .returning("*");

    return res.status(200).json({
      ...problemUpdated[0],
      address: { ...address },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteProblem = async (req, res) => {
  const { id } = req.params;
  try {
    const problemExist = await knex("problems").where({ id }).first();

    if (!problemExist || problemExist.user_id != req.user.id) {
      return res.status(404).json({ message: "Problem not found" });
    }

    await knex("solutions").del().where({ problem_id: id });
    await knex("problems").del().where({ id });
    await knex("addresses").del().where({ id: problemExist.address_id });

    return res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const postComment = async (req, res) => {
  const { comment, imgUrl } = req.body;
  const { id } = req.params;
  try {
    const problemExist = await knex("problems").where({ id }).first();

    if (!problemExist) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const newComment = await knex("comments")
      .insert({
        comment,
        imgUrl,
        user_id: req.user.id,
        problem_id: problemExist.id,
      })
      .returning("*");
    const author = await knex("users")
      .where({ id: req.user.id })
      .select("fullname");
    newComment[0].author = author[0].fullname;

    return res.status(200).json(newComment[0]);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteComment = async (req, res) => {
  const { id, id_comment } = req.params;
  try {
    const problemExist = await knex("problems").where({ id }).first();

    if (!problemExist) {
      return res.status(404).json({ message: "Problem not found" });
    }
    const commentExist = await knex("comments")
      .where({ id: id_comment })
      .first();

    if (!commentExist) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (
      commentExist.user_id === req.user.id ||
      problemExist.user_id === req.user.id
    ) {
      await knex("comments").del().where({ id: id_comment });

      return res.status(200).json({ message: "Comment deleted" });
    }

    return res.status(404).json({ message: "Comment not found" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  createProblem,
  getProblems,
  getProblem,
  updateProblem,
  deleteProblem,
  getProblemSolutions,
  postComment,
  deleteComment,
};
