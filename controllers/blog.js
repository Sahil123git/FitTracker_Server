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
    const like = req.body.userLike;
    const dislike = req.body.userDislike;

    let likeCnt = req.body.likes,
      dislikeCnt = req.body.dislikes;

    if (prevLike !== like) {
      if (like) {
        likeCnt += 1;
      } else {
        likeCnt -= 1;
      }
    } else if (prevDislike !== dislike) {
      if (dislike) {
        dislikeCnt += 1;
      } else {
        dislikeCnt -= 1;
      }
    }
    const blogData = { ...req.body, likes: likeCnt, dislikes: dislikeCnt };
    const response = await Blogs.findByIdAndUpdate(req.body.blogId, blogData);

    let userReaction;
    if (req.body.likeId) {
      userReaction = await Reactions.findByIdAndUpdate(req.body.likeId, {
        like: req.body.like,
        dislike: req.body.dislike,
      });
    } else {
      console.log("reached here");
      userReaction = await Reactions.create({
        blogId: req.body.blogId,
        userId: req.user.id,
        like: req.body.userLike,
        dislike: req.body.userDislike,
      });
    }
    console.log({ response, userReaction });
    response._doc.userLike = userReaction.like;
    response._doc.userDislike = userReaction.dislike;
    // console.log(req.params.id, User:req.user);

    return res.status(200).json({
      data: response,
      message: "Blogs fetched successfully",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
