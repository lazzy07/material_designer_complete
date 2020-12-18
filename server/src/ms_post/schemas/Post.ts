import mongoose, { Schema, Document } from "mongoose";
import { CommentType, commentSchema } from "../../common/interfaces/Comment";

interface PostType extends Document {
  id: string;
  userId: string;
  type: string;
  dataId: string;
  likes: number;
  likedBy: string[];
  noOfComments: number;
  comments: CommentType[];
  tags: string[];
}

const PostSchema = new Schema(
  {
    type: { type: String, required: true },
    userId: { type: String, required: true },
    dataId: { type: String, required: true },
    likes: { type: Number, required: true, index: true, default: 0 },
    noOfComments: { type: Number, required: true, default: 0 },
    comments: { type: [commentSchema], default: [] },
    likedBy: { type: [String], default: [] },
    tags: { type: [String], default: [] }
  },
  { timestamps: true }
);

PostSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

PostSchema.set("toJSON", { virtuals: true });

export default mongoose.model<PostType>("Post", PostSchema);
