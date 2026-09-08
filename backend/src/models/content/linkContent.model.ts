import { Schema } from "mongoose";
import Content, { ContentDocument } from "./baseContent.model";

export interface LinkContentDocument extends ContentDocument {
  url: string;
  description?: string;
}

const linkContentSchema = new Schema<LinkContentDocument>({
  url: { type: String, required: true },
  description: { type: String }, // Optional field
});

const LinkContent = Content.discriminator<LinkContentDocument>(
  "LinkContent",
  linkContentSchema
);

export default LinkContent;
