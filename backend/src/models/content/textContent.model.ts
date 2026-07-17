import { Schema } from "mongoose";
import Content, { ContentDocument } from "./baseContent.model";

export interface TextContentDocument extends ContentDocument {
  body: string;
}

const textContentSchema = new Schema<TextContentDocument>({
  body: { type: String, required: true },
});

const TextContent = Content.discriminator<TextContentDocument>(
  "TextContent",
  textContentSchema
);

export default TextContent;
