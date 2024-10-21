import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/verifyToken.js";
import { getBlogs, getParticularBlog } from "../controllers/blog.js";

router.get("/", verifyToken, getBlogs);
router.get("/:id", verifyToken, getParticularBlog);

export default router;
