import jwt from "jsonwebtoken";
import "dotenv/config";

const { TOKEN_SECRET } = process.env;

export const token = (payload, expiresIn) => {
  const token = jwt.sign(payload, TOKEN_SECRET, {
    expiresIn: expiresIn || "1d",
  });

  return token;
};
