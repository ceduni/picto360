import mongoose, { Document, Schema } from "mongoose";

export interface LinkContentDocument extends Document {
  id: string;
  creationDate: Date;
  lastModificationDate: Date;
  title: string;
  url: string;
  description?: string;
}

const linkContentSchema = new Schema<LinkContentDocument>({
  id: { type: String, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  lastModificationDate: { type: Date, default: Date.now, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String }, // Optional field
});

const LinkContent = mongoose.model<LinkContentDocument>(
  "LinkContent",
  linkContentSchema
);

export default LinkContent;
