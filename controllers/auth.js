import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
dotenv.config();

export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;
    const existingUser = await User.findOne({ email }).exec();
    console.log({ existingUser });
    if (existingUser) {
      return next(createError(409, "Email is already in use."));
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });
    const createdUser = await user.save();
    const token = jwt.sign({ id: createdUser._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    return res.status(200).json({ message: "Logged In successfully", token });
  } catch (error) {
    return next(error);
  }
};
export const UserLogin = async (req, res, next) => {
  try {
    console.log("reached signin");
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect password"));
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    return res.status(200).json({ message: "Logged In successfully", token });
  } catch (error) {
    return next(error);
  }
};
