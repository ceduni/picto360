import { Schema } from "mongoose";
import Content, { ContentDocument } from "./baseContent.model";

export interface MediaContentDocument extends ContentDocument {
  url: string;
  mediaType: "IMAGE" | "VIDEO" | "GIF";
  size?:number;
}

const mediaContentSchema = new Schema<MediaContentDocument>({
  url: { type: String, required: true },
  mediaType: { type: String, enum: ["IMAGE", "VIDEO", "GIF"],  required: true }, // e.g., 'image', 'video', etc.
  size:{type:Number}
});

const MediaContent = Content.discriminator<MediaContentDocument>(
  "MediaContent",
  mediaContentSchema
);

export default MediaContent;
