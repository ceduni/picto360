import mongoose, { Document, Schema, Types } from "mongoose";
import { ContentDocument } from "./content/baseContent.model";
import { ProjectDocument } from "./project.model";
import { ActivityDocument } from "./activity.model";

export type AnnotationAssetSource = "url" | "local";
export type AnnotationType = "TEXT" | "LABEL" | "IMAGE" | "GIF" | "VIDEO" | "LINK"

export interface AnnotationDocument extends Document {
  pitch: number;
  yaw: number;
  type: AnnotationType;  
  content: Types.ObjectId | ContentDocument; // Contains the data related to the hotspot
  project: ProjectDocument ; // is inside a project
  visible: boolean;   // for activities where the participants have to find it
  label?: string;
  cssClass?: string;
}

const annotationSchema = new Schema<AnnotationDocument>({
  pitch: { type: Number, required: true },
  yaw: { type: Number, required: true },
  type: {type:String, enum:["TEXT", "LABEL", "IMAGE", "GIF", "VIDEO", "LINK"], required : true},
  content: { type: Types.ObjectId, ref:"Content", required: true }, // assumes 'content' is a dynamic object
  project:{type:Types.ObjectId, ref:"PictoProject", required: true},
  visible: { type: Boolean, required: true },
  label:{type:String},
  cssClass:{type:String},
},{
  _id:true,
  timestamps:true,
});

const Annotation = mongoose.model<AnnotationDocument>(
  "Annotation",
  annotationSchema
);

export default Annotation;
