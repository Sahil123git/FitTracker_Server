import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    heading: { type: String },
    content: {
      type: Array,
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, defualt: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);
