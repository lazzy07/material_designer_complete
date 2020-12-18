import mongoose, { Schema, Document } from "mongoose";
import { ImageType } from "../../common/interfaces/Image";
import { ImageSchema } from "../../common/db_schema_helpers/ImageSchema";

export interface ArtworkType extends Document {
  userId: string;
  description: string;
  image: ImageType;
  // tags: String[];
}

const ArtworkSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    description: { type: String, required: true },
    image: ImageSchema
    // tags: { type: [String], default: [] }
  },
  { timestamps: true }
);

ArtworkSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

ArtworkSchema.set("toJSON", { virtuals: true });

export default mongoose.model<ArtworkType>("Artwork", ArtworkSchema);
