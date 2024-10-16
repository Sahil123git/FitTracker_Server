import express from "express";
import auth from "./auth.js";
import workout from "./workout.js";
import dashboard from "./dashboard.js";
import blog from "./blog.js";
import { updateUser, userDetails } from "../controllers/userDetails.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploadResource } from "../controllers/upload.js";
import upload from "../multer-config.js";
const router = express.Router();

router.post("/upload", upload.single("resource"), uploadResource); //we are sending file in resource key
router.use("/auth", auth);
router.use("/workout", workout);
router.use("/dashboard", dashboard);
router.use("/blogs", blog);
router.get("/user/:id", verifyToken, userDetails);
router.put("/user/:id", verifyToken, updateUser);

export default router;
