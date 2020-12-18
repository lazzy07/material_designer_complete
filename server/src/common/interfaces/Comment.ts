import { Schema } from "mongoose";
import { ReplySchema, ReplyType } from "./Reply";

export interface CommentType {
  postId: string;
  userId: string;
  comment: string;
}

export const commentSchema = new Schema(
  {
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    comment: { type: String, required: true }
    // replies: [ReplySchema]
  },
  { timestamps: true }
);
