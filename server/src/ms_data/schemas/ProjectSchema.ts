import mongoose, { Schema, Document } from "mongoose";

interface ProjectType extends Document {
  id: string;
  userId: string;
  project: object;
  name: string;

  createdAt: number;
  modifiedAt: number;
  deletedAt: number;
}

const ProjectSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    project: { type: Object, required: true }
  },
  { timestamps: true }
);

ProjectSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

ProjectSchema.set("toJSON", { virtuals: true });

export default mongoose.model<ProjectType>("Project", ProjectSchema);
