const Joi = require("joi").extend(require("@joi/date"));
const maxDeadline = require("../utils/problemDeadline");

const createProblemSchema = Joi.object({
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
  address: Joi.object()
    .keys({
      city: Joi.string().required().trim().messages({
        "any.required": "City is required",
        "string.base": "City should be a string",
        "string.empty": "City is empty",
      }),
      uf: Joi.string().required().trim().messages({
        "any.required": "UF is required",
        "string.base": "UF should be a string",
        "string.empty": "UF is empty",
      }),
      neighborhood: Joi.string().required().trim().messages({
        "any.required": "Neighborhood is required",
        "string.base": "Neighborhood should be a string",
        "string.empty": "Neighborhood is empty",
      }),
    })
    .messages({
      "object.base": "Address should be an object",
    }),
  imgUrl: Joi.string().required().trim().messages({
    "any.required": "imgUrl is required",
    "string.base": "imgUrl should be a string",
    "string.empty": "imgUrl is empty",
  }),
  pix: Joi.string().required().trim().messages({
    "any.required": "Pix is required",
    "string.base": "Pix should be a string",
    "string.empty": "Pix is empty",
  }),
  deadline: Joi.date()
    .format("DD/MM/YYYY")
    .utc()
    .min("now")
    .max(maxDeadline)
    .messages({
      "any.required": "Deadline is required",
      "date.base": "Deadline is invalid, DD/MM/YYYY",
      "date.min": "Deadline must be a future date",
      "date.format": "Deadline is invalid, DD/MM/YYYY",
      "date.max": "Deadline must maximum 30 days from now",
    }),
});

const updateProblemSchema = Joi.object({
  title: Joi.string().trim().messages({
    "string.base": "Title should be a string",
    "string.empty": "Title is empty",
  }),
  description: Joi.string().trim().messages({
    "string.base": "Description should be a string",
    "string.empty": "Description is empty",
  }),
  address: Joi.object()
    .keys({
      city: Joi.string().trim().messages({
        "string.base": "City should be a string",
        "string.empty": "City is empty",
      }),
      uf: Joi.string().trim().messages({
        "string.base": "UF should be a string",
        "string.empty": "UF is empty",
      }),
      neighborhood: Joi.string().trim().messages({
        "string.base": "Neighborhood should be a string",
        "string.empty": "Neighborhood is empty",
      }),
    })
    .messages({
      "object.base": "Address should be an object",
    }),
  imgUrl: Joi.string().trim().messages({
    "string.base": "Image url should be a string",
    "string.empty": "Image url is empty",
  }),
  pix: Joi.string().trim().messages({
    "string.base": "Pix should be a string",
    "string.empty": "Pix is empty",
  }),
  deadline: Joi.date()
    .format("DD/MM/YYYY")
    .utc()
    .min("now")
    .max(maxDeadline)
    .messages({
      "any.required": "Deadline is required",
      "date.base": "Deadline is invalid, DD/MM/YYYY",
      "date.min": "Deadline must be a future date",
      "date.format": "Deadline is invalid, DD/MM/YYYY",
      "date.max": "Deadline must maximum 30 days from now",
    }),
});

module.exports = { createProblemSchema, updateProblemSchema };
