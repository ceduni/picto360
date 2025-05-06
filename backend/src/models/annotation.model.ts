import mongoose, { Document, Schema } from "mongoose";

export interface PositionDocument extends Document {
  x: number;
  y: number;
}

export interface AnnotationDocument extends Document {
  id: string;
  type: string;
  label: string;
  visible: boolean;
  creationDate: Date;
  lastModificationDate: Date;
  position: PositionDocument;
  content: unknown;
}

const positionSchema = new Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});

const annotationSchema = new Schema<AnnotationDocument>({
  id: { type: String, required: true },
  type: { type: String, required: true },
  label: { type: String, required: true },
  visible: { type: Boolean, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  lastModificationDate: { type: Date, default: Date.now, required: true },
  position: { type: positionSchema, required: true }, // use the Position schema
  content: { type: Schema.Types.Mixed, required: true }, // assumes 'content' is a dynamic object
});

const Annotation = mongoose.model<AnnotationDocument>(
  "Annotation",
  annotationSchema
);

export default Annotation;
