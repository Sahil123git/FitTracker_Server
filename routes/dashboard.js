import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/verifyToken.js";
import { getUserDashboard } from "../controllers/dasboard.js";

router.get("/", verifyToken, getUserDashboard);

export default router;
