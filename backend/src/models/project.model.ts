import mongoose, { Document, Schema, Types } from "mongoose";
import { AnnotationDocument } from "./annotation.model";
import { ImageDocument } from "./image.model";

export interface ProjectDocument extends Document {
  name: string;
  annotations:[AnnotationDocument]
  images:[ImageDocument]
}

const projectSchema = new Schema<ProjectDocument>({
  name: { type: String, required: true },
  images:{type:[Types.ObjectId], ref:"PictoImage",  required:true},
  annotations:{type: [Types.ObjectId], ref:"Annotation"},
},{
  _id:true,
  timestamps:true
});

const PictoProject = mongoose.model<ProjectDocument>("PictoProject", projectSchema);

export default PictoProject;
