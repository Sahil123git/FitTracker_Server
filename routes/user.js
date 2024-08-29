import express from "express";
import auth from "./auth.js";
import workout from "./workout.js";
import dashboard from "./dashboard.js";
import { userDetails } from "../controllers/userDetails.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.use("/auth", auth);
router.use("/workout", workout);
router.use("/dashboard", dashboard);
router.get("/user/:id", verifyToken, userDetails);

export default router;
