import mongoose, { Document, Schema } from "mongoose";

export interface ContentDocument extends Document {
  id: string;
  creationDate: Date;
  lastModificationDate: Date;
  title: string;
}

export const baseContentFields = {
  id: { type: String, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  lastModificationDate: { type: Date, default: Date.now, required: true },
  title: { type: String, required: true },
};

const contentSchema = new Schema<ContentDocument>({
  ...baseContentFields,
});

const Content = mongoose.model<ContentDocument>("Content", contentSchema);

export default Content;
