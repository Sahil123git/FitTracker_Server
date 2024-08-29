import express from "express";
const router = express.Router();
import { UserLogin, UserRegister } from "../controllers/auth.js";

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

export default router;
