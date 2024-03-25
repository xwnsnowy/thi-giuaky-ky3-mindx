import bcryptjs from "bcryptjs";

export const comparePassword = async (password, hashPassword) => {
  const validPassword = await bcryptjs.compare(password, hashPassword);
  if (!validPassword) {
    return res.status(400).json({
      message: "Password is incorrect",
    });
  }
};

export const hashPassword = async (password) => {
  const salt = bcryptjs.genSaltSync(10);
  const hashPassword = await bcryptjs.hash(password, salt);
  return hashPassword;
};
