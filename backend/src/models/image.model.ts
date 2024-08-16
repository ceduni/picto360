import mongoose, { Document, Schema } from "mongoose";

export interface ImageDocument extends Document {
  id: string;
  url: string;
  description: string;
  creationDate: Date;
  lastModificationDate: Date;
}

const imageSchema = new Schema<ImageDocument>({
  id: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: false },
  creationDate: { type: Date, default: Date.now, required: true },
  lastModificationDate: { type: Date, default: Date.now, required: true },
});

const Image = mongoose.model<ImageDocument>("Image", imageSchema);

export default Image;
