import Profile from "../models/Profile.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { TOKEN_SECRET } = process.env;

export const checkAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    } else {
      const user = await User.findById(decoded._id);
      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found" });
      }

      req.user = decoded;
      next();
    }
  });
};

export const checkProfileOwnership = async (req, res, next) => {
  try {
    // user này vefify từ token ra rồi
    const userId = req.user._id;
    const profileId = req.params.id;
    const profile = await Profile.findById(profileId);

    if (!profile) {
      return res.status(404).json({ error: "Khong tim thay profile" });
    }

    if (profile.userId.toString() !== userId) {
      return res.status(403).json({ error: "Ban khong co quyen" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
