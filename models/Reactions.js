import mongoose from "mongoose";

const ReactionsSchema = new mongoose.Schema(
  {
    userId: { type: String },
    blogId: { type: String, default: "" },
    like: { type: Boolean, default: false },
    dislike: { type: Boolean, defualt: false },
  },
  { timestamps: true }
);

export default mongoose.model("Reactions", ReactionsSchema);
