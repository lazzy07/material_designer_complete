import mongoose, { Schema, Document } from "mongoose";
import { ImageType } from "../../common/interfaces/Image";
import { ImageSchema } from "../../common/db_schema_helpers/ImageSchema";

interface MaterialType extends Document {
  userId: string;
  title: string;
  material: object;
  data: string;
  description: string;
  image: ImageType;
  // tags: string[];

  createdAt: number;
  modifiedAt: number;
  deletedAt: number;
}

const MaterialSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    material: { type: Object, required: true },
    image: ImageSchema,
    // tags: { type: [String] },
    data: { type: String, required: true },
    isPublic: { type: Boolean, default: false }
  },
  { timestamps: true }
);

MaterialSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

MaterialSchema.set("toJSON", { virtuals: true });

export default mongoose.model<MaterialType>("Material", MaterialSchema);
