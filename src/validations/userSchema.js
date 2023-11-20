const Joi = require("joi").extend(require("@joi/date"));

const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
    })
    .messages({
      "any.required": "E-mail is required",
      "string.email": "Invalid e-mail address",
    }),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[.,!@#$%^&*(\)\-_+=])[A-Za-z0-9.,!@#$%^&*(\)\-_+=]{4,30}/
      )
    )
    .messages({
      "any.required": "Password is required",
      "string.pattern.base":
        "Password must be from 4 to 30 characters, and must contain at least: one lower case, one upper case, one number and one special character",
    }),
});

const createUserSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
    })
    .messages({
      "any.required": "E-mail is required",
      "string.email": "Invalid e-mail address",
      "string.empty": "E-mail is empty",
    }),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[.,!@#$%^&*(\)\-_+=])[A-Za-z0-9.,!@#$%^&*(\)\-_+=]{4,30}/
      )
    )
    .messages({
      "any.required": "Password is required",
      "string.base": "Password must be a string",
      "string.empty": "Password is empty",
      "string.pattern.base":
        "Password must be from 4 to 30 characters, and must contain at least: one lower case, one upper case, one number and one special character",
    }),
  fullname: Joi.string().required().trim().messages({
    "any.required": "Fullname is required",
    "string.base": "Fullname should be a string",
    "string.empty": "Fullname is empty",
  }),
  birthdate: Joi.date()
    .format("DD/MM/YYYY")
    .utc()
    .max("now")
    .required()
    .messages({
      "any.required": "Birthdate is required",
      "date.base": "Birthdate is invalid, DD/MM/YYYY",
      "date.max": "Birthdate can´t be more than today",
      "date.format": "Birthdate is invalid, DD/MM/YYYY",
    }),
  cellphone: Joi.string()
    .required()
    .pattern(new RegExp(/^[\d\s\-\(\)]{10,}$/))
    .messages({
      "any.required": "Cellphone is required",
      "string.base": "Cellphone should be a string",
      "string.empty": "Cellphone is empty",
      "string.min": "Cellphone must be at least 10 characters",
      "string.pattern.base":
        "Cellphone must be at least 10 characters long, contain only numbers or special characters: '(';')';'-'",
    }),
});

module.exports = { loginSchema, createUserSchema };
