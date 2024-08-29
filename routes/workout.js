import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getWorkoutsByDate,
  addWorkout,
  editWorkout,
  deleteWorkout,
} from "../controllers/workout.js";

router.get("/", verifyToken, getWorkoutsByDate);
router.post("/", verifyToken, addWorkout);
router.put("/", verifyToken, editWorkout);
router.delete("/:id", verifyToken, deleteWorkout);
export default router;
