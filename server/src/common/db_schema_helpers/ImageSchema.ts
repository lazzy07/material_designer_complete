import { Schema } from "mongoose";

export const ImageSchema = new Schema({
  userId: { type: String, required: true },
  height: { type: Number, required: true },
  width: { type: Number, required: true },
  preview: { type: String, required: true },
  url: { type: String, required: true }
});
