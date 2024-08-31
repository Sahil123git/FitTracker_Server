import dayjs from "dayjs";
import Workout from "../models/Workout.js";
import User from "../models/User.js";
import { createError } from "../error.js";

export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { workout } = req.body;
    if (!workout) {
      return next(createError(400, "Workout is missing"));
    }
    if (
      !workout.category ||
      !workout.workoutName ||
      !workout.sets ||
      !workout.reps ||
      !workout.weight ||
      !workout.duration
    ) {
      return next(createError(400, "Some fields are missing"));
    }

    workout.caloriesBurned = calculateCaloriesBurnt(workout);
    const response = await Workout.create({ ...workout, user: userId });

    return res.status(201).json({
      message: "Workouts added successfully",
      workouts: response,
    });
  } catch (err) {
    next(err);
  }
};
export const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    const dateString = req.query.date
      ? req.query.date
      : dayjs().format("M/D/YYYY");
    console.log({ dateString, date: req.query.date });
    let date = new Date(dateString);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const todaysWorkouts = await Workout.find({
      userId: userId,
      date: { $gte: startOfDay, $lt: endOfDay },
    });
    const totalCaloriesBurnt = todaysWorkouts.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0
    );
    return res
      .status(200)
      .json({ todaysWorkouts, totalCaloriesBurnt, date: dateString });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const editWorkout = async (req, res, next) => {
  try {
    const workout = req.body;
    if (
      !workout.category ||
      !workout.workoutName ||
      !workout.sets ||
      !workout.reps ||
      !workout.weight ||
      !workout.duration
    ) {
      return next(createError(400, "Some fields are missing"));
    }

    workout.caloriesBurned = calculateCaloriesBurnt(workout);
    const resp = await Workout.findByIdAndUpdate(workout._id, { ...workout });
    return res.status(201).json({
      message: "Workout updated successfully",
      workouts: resp,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
export const deleteWorkout = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resp = await Workout.findByIdAndDelete(id);
    return res.status(201).json({
      message: "Workout deleted successfully",
      workouts: resp,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
// Function to calculate calories burnt for a workout
const calculateCaloriesBurnt = (workoutDetails) => {
  const durationInMinutes = parseInt(workoutDetails.duration);
  const weightInKg = parseInt(workoutDetails.weight);
  const caloriesBurntPerMinute = 5; // Sample value, actual calculation may vary
  return durationInMinutes * caloriesBurntPerMinute * weightInKg;
};
