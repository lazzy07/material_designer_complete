import mongoose, { Schema, Document } from "mongoose";
import { ImageSchema } from "../../common/db_schema_helpers/ImageSchema";
import { UserType } from "./../../common/interfaces/UserD";

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      index: true,
      required: true,
      maxlength: 30
    },
    firstName: { type: String, required: true, maxlength: 100 },
    lastName: { type: String, maxlength: 100 },
    password: { type: String, required: true },
    profilePicture: ImageSchema,
    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
      maxlength: 100
    },
    type: { type: Number, required: true },
    followers: { type: [String], default: [] },
    following: { type: [String], default: [] },
    secureKeys: { type: [String], default: [] },
    apiKeys: { type: [String], default: [] }
  },
  { timestamps: true }
);

UserSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

UserSchema.set("toJSON", { virtuals: true });

export default mongoose.model<UserType>("User", UserSchema);
