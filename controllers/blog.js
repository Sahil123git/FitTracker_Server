import Blogs from "../models/Blog.js";

export const getBlogs = async (req, res, next) => {
  try {
    const response = await Blogs.find(
      {},
      { heading: 1, likes: 1, dislikes: 1, shortDesc: 1 }
    );
    return res.status(200).json({
      data: response,
      message: "Blogs fetched successfully",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
export const getParticularBlog = async (req, res, next) => {
  try {
    const response = await Blogs.findById(req.params.id);
    console.log({ response });
    return res.status(200).json({
      data: response,
      message: "Blogs fetched successfully",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
