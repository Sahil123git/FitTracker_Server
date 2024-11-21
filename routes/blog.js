import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getBlogs,
  getParticularBlog,
  likeOrDislikeBlog,
} from "../controllers/blog.js";

router.get("/", verifyToken, getBlogs);
router.get("/:id", verifyToken, getParticularBlog);
router.put("/likeDislike", verifyToken, likeOrDislikeBlog);
export default router;
