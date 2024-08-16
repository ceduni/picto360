import mongoose, { Document, Schema } from "mongoose";

export interface ProjectDocument extends Document {
  id: string;
  name: string;
  description: string;
  creationDate: Date;
  lastModificationDate: Date;
}

const projectSchema = new Schema<ProjectDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  lastModificationDate: { type: Date, default: Date.now, required: true },
});

const Project = mongoose.model<ProjectDocument>("Project", projectSchema);

export default Project;
