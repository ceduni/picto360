import mongoose, { Schema } from "mongoose";
import { baseContentFields, ContentDocument } from "./content.model";

export interface MediaContentDocument extends ContentDocument {
  mediaType: string;
  url: string;
}

const mediaContentSchema = new Schema<MediaContentDocument>({
  ...baseContentFields,
  mediaType: { type: String, required: true }, // e.g., 'image', 'video', etc.
  url: { type: String, required: true },
});

const MediaContent = mongoose.model<MediaContentDocument>(
  "MediaContent",
  mediaContentSchema
);

export default MediaContent;
