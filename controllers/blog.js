import Blogs from "../models/Blog.js";

export const getBlogs = async (req, res, next) => {
  try {
    const response = await Blogs.find();
    return res.status(200).json({
      data: response,
      message: "Blogs fetched successfully",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
