import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/verifyToken.js";
import { getBlogs } from "../controllers/blog.js";

router.get("/", verifyToken, getBlogs);

export default router;
