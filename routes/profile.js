import { Router } from "express";
import {
  getProfileById,
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
} from "../controllers/profile.js";
import { checkProfileOwnership } from "../middlewares/checkAuth.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const profileRouter = Router();

profileRouter.get("/", getProfiles);

profileRouter.get("/:id", getProfileById);

profileRouter.use(checkPermission, checkProfileOwnership);

profileRouter.post("/create", createProfile);

profileRouter.put("/update/:id", updateProfile);

profileRouter.delete("/delete/:id", deleteProfile);

export default profileRouter;
