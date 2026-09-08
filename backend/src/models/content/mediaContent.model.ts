import { Schema } from "mongoose";
import Content, { ContentDocument } from "./baseContent.model";


export type MediaContentType = "IMAGE" | "GIF" | "VIDEO";

export interface MediaContentDocument extends ContentDocument {
  r2Key: string;
  mediaType: MediaContentType;
  url?: string;
  size?: number;
  mimeType?: string;
}

const mediaContentSchema = new Schema<MediaContentDocument>({
  r2Key: { type: String, required: true },
  mediaType: { type: String, enum: ["IMAGE", "VIDEO", "GIF"],  required: true }, // e.g., 'image', 'video', etc.
  url: { type: String},
  size:{type:Number},
  mimeType:{type:String},
});

const MediaContent = Content.discriminator<MediaContentDocument>(
  "MediaContent",
  mediaContentSchema
);

export default MediaContent;
