import User from "../models/User.js";

export const userDetails = async (req, res, next) => {
  try {
    const userId = req.params?.id;
    const response = await User.findById(userId);
    return res.status(200).json({
      data: response,
      message: "User fetched successfully",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
