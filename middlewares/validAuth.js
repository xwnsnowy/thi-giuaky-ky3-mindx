import { loginSchema, registerSchema } from "../validations/auth.js";

export const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};
