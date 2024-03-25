import { Router } from "express";
import authRouter from "./auth.js";
import profileRouter from "./profile.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);

export default router;
