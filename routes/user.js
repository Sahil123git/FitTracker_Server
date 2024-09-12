import express from "express";
import auth from "./auth.js";
import workout from "./workout.js";
import dashboard from "./dashboard.js";
import { userDetails } from "../controllers/userDetails.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploadResource } from "../controllers/upload.js";
import upload from "../multer-config.js";
const router = express.Router();

console.log("reached here and called");
router.post("/upload", upload.single("resource"), uploadResource);
router.use("/auth", auth);
router.use("/workout", workout);
router.use("/dashboard", dashboard);
router.get("/user/:id", verifyToken, userDetails);

export default router;
