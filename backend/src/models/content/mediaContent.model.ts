import { Schema, Types } from "mongoose";
import Content, { ContentDocument } from "./baseContent.model";
import { MediaDocument } from "../pictoMedia.model";


export type MediaContentType = "IMAGE" | "GIF" | "VIDEO";

// The file itself lives in a PictoMedia record (Cloudflare Images or R2), so
// annotation media goes through the same upload, signing and cleanup path as
// the playground's main media.
export interface MediaContentDocument extends ContentDocument {
  media: Types.ObjectId | MediaDocument;
  mediaType: MediaContentType;
}

const mediaContentSchema = new Schema<MediaContentDocument>({
  media: { type: Schema.Types.ObjectId, ref: "PictoMedia", required: true },
  mediaType: { type: String, enum: ["IMAGE", "VIDEO", "GIF"],  required: true },
});

const MediaContent = Content.discriminator<MediaContentDocument>(
  "MediaContent",
  mediaContentSchema
);

export default MediaContent;
