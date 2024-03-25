import User from "../models/User.js";
import { token } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { validBody } from "../utils/validBody.js";
import { loginSchema, registerSchema } from "../validations/auth.js";

export const register = async (req, res, next) => {
  try {
    /**
     * 1. Validate request body
     * 2. Check if email is already in use
     * 3. Hash password
     * 4. Create user - save to database
     */
    const { username, password } = req.body;

    validBody(req.body, registerSchema);

    // 2. Check if email is already in use
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(400).json({
        message: "Username is already in use",
      });
    }

    // 3. Hash password
    const hashPasswordUser = await hashPassword(password);

    // 4. Create user - save to database

    // Cach 1:
    const user = await User.create({
      username,
      password: hashPasswordUser,
    });

    // Cach 2:
    // const user = new User({ email, password: hashPassword });
    // await user.save();

    user.password = undefined;
    return res.status(201).json({
      message: "Register successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    /**
     * 1. Validate request body
     * 2. Check if email exists
     * 3. Compare password
     * 4. Generate token
     * 5. Response token, user info
     */
    const { username, password } = req.body;
    validBody(req.body, loginSchema);

    // 2. Check user exists
    const userExist = await User.findOne({ username });
    if (!userExist) {
      return res.status(400).json({
        message: "Username is not found",
      });
    }

    // 3. Compare password
    comparePassword(password, userExist.password);

    // 4. Generate token
    const accessToken = token({ _id: userExist._id }, "1h");

    // 5. Response token, user info
    userExist.password = undefined;
    return res.status(200).json({
      message: "Login successfully!",
      accessToken,
      user: userExist,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
