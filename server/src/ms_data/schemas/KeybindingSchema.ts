import mongoose, { Schema, Document } from "mongoose";

interface KeybindingType extends Document {
  userId: string;
  name: string;
  description: string;
  active: string;

  createdAt: number;
  modifiedAt: number;
  deletedAt: number;
}

const KeybindingSchema = new Schema({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  description: { type: String, required: true },
  data: { type: Object, required: true },
  tags: { type: [String] },

  createdAt: { type: Date, required: true, auto: true, index: true },
  modifiedAt: { type: Date, required: true, auto: true, index: true },
  deletedAt: { type: Date }
});

KeybindingSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

KeybindingSchema.set("toJSON", { virtuals: true });

export default mongoose.model<KeybindingType>("Keybinding", KeybindingSchema);
