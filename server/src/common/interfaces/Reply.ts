import { Schema } from "mongoose";

export interface ReplyType {
  id: string;
  userId: string;
  commentId: string;
  dateTime: number;
  reply: string;
}

export const ReplySchema = new Schema({
  id: String,
  userId: String,
  commentId: String,
  dateTime: Number,
  reply: String
});
