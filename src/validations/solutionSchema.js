const Joi = require("joi").extend(require("@joi/date"));

const createSolutionSchema = Joi.object({
  title: Joi.string().required().trim().messages({
    "any.required": "Title is required",
    "string.base": "Title should be a string",
    "string.empty": "Title is empty",
  }),
  description: Joi.string().required().trim().messages({
    "any.required": "Description is required",
    "string.base": "Description should be a string",
    "string.empty": "Description is empty",
  }),
  imgUrl: Joi.string().trim().messages({
    "string.base": "imgUrl should be a string",
    "string.empty": "imgUrl is empty",
  }),
  price: Joi.number().required().positive().messages({
    "any.required": "Price is required",
    "number.base": "Price should be a number",
    "number.positive": "Price is positive",
    "number.empty": "Price is empty",
  }),
});

const updateSolutionSchema = Joi.object({
  title: Joi.string().trim().messages({
    "string.base": "Title should be a string",
    "string.empty": "Title is empty",
  }),
  description: Joi.string().trim().messages({
    "string.base": "Description should be a string",
    "string.empty": "Description is empty",
  }),
  imgUrl: Joi.string().trim().messages({
    "string.base": "imgUrl should be a string",
    "string.empty": "imgUrl is empty",
  }),
  price: Joi.number().positive().messages({
    "number.base": "Price should be a number",
    "number.positive": "Price is positive",
    "number.empty": "Price is empty",
  }),
});

module.exports = { createSolutionSchema, updateSolutionSchema };
