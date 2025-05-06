import mongoose, { Document, Schema } from "mongoose";

export interface TextContentDocument extends Document {
  id: string;
  creationDate: Date;
  lastModificationDate: Date;
  title: string;
  body: string;
}

const textContentSchema = new Schema<TextContentDocument>({
  id: { type: String, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  lastModificationDate: { type: Date, default: Date.now, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
});

const TextContent = mongoose.model<TextContentDocument>(
  "TextContent",
  textContentSchema
);

export default TextContent;
