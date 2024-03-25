import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number(),
  role: Joi.string(),
  phoneNumber: Joi.string(),
  address: Joi.string(),
  avatar: Joi.string(),
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
