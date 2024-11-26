import Blogs from "../models/Blog.js";
import Reactions from "../models/Reactions.js";

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
    const likes = await Reactions.findOne({
      blogId: req.params.id,
      userId: req.user.id,
    });
    response._doc.userLike = likes?.like ?? false;
    response._doc.userDislike = likes?.dislike ?? false;
    response._doc.likeId = likes?._id ?? null;
    console.log({ response });
    return res.status(200).json({
      data: response._doc,
      message: "Blogs fetched successfully",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
export const likeOrDislikeBlog = async (req, res, next) => {
  try {
    const prevLike = req.body.prevLike;
    const prevDislike = req.body.prevDislike;
    let like = req.body.userLike;
    let dislike = req.body.userDislike;

    let likeCnt = req.body.likes,
      dislikeCnt = req.body.dislikes;

    if (prevLike !== like) {
      if (like) {
        likeCnt += 1;
        if (dislike === true) {
          dislikeCnt -= 1;
          dislike = false;
        }
      } else {
        likeCnt -= 1;
      }
    } else if (prevDislike !== dislike) {
      if (dislike) {
        dislikeCnt += 1;
        if (like === true) {
          likeCnt -= 1;
          like = false;
        }
      } else {
        dislikeCnt -= 1;
      }
    }
    const blogData = { ...req.body, likes: likeCnt, dislikes: dislikeCnt };
    const response = await Blogs.findByIdAndUpdate(req.body.blogId, blogData, {
      new: true,
    });

    let userReaction;
    if (req.body.likeId) {
      userReaction = await Reactions.findByIdAndUpdate(
        req.body.likeId,
        {
          like: like,
          dislike: dislike,
        },
        { new: true }
      );
    } else {
      userReaction = await Reactions.create({
        blogId: req.body.blogId,
        userId: req.user.id,
        like: like,
        dislike: dislike,
      });
    }
    response._doc.userLike = userReaction.like;
    response._doc.userDislike = userReaction.dislike;
    response._doc.likeId = userReaction._id;

    return res.status(200).json({
      data: response,
      message: "Blogs fetched successfully",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
