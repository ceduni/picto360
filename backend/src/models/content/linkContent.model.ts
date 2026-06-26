import mongoose, { Document, Schema } from "mongoose";
import { baseContentFields, ContentDocument } from "./content.model";

export interface LinkContentDocument extends ContentDocument {
  url: string;
  description?: string;
}

const linkContentSchema = new Schema<LinkContentDocument>({
  ...baseContentFields,
  url: { type: String, required: true },
  description: { type: String }, // Optional field
});

const LinkContent = mongoose.model<LinkContentDocument>(
  "LinkContent",
  linkContentSchema
);

export default LinkContent;
