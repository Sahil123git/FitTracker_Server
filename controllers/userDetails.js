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

export const updateUser = async (req, res) => {
  try {
    const userId = req.params?.id;
    console.log({ userId, resp: req.body });
    const resp = await User.findByIdAndUpdate(userId, req.body, { new: true });
    return res.status(200).json({
      data: resp,
      message: "User fetched successfully",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
