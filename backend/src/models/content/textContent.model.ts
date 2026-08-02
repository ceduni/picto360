import mongoose, { Schema } from "mongoose";
import { baseContentFields, ContentDocument } from "./content.model";

export interface TextContentDocument extends ContentDocument {
  body: string;
}

const textContentSchema = new Schema<TextContentDocument>({
  ...baseContentFields,
  body: { type: String, required: true },
});

const TextContent = mongoose.model<TextContentDocument>(
  "TextContent",
  textContentSchema
);

export default TextContent;
