import { Schema, Types } from "mongoose";
import Content, { ContentDocument } from "./baseContent.model";
import { MediaDocument } from "../pictoMedia.model";


export type MediaContentType = "IMAGE" | "GIF" | "VIDEO";

// Either an uploaded file or an external link (e.g. YouTube, Giphy), never both.
// An uploaded file lives in a PictoMedia record (Cloudflare Images or R2), so
// annotation media goes through the same upload, signing and cleanup path as
// the playground's main media.
export interface MediaContentDocument extends ContentDocument {
  media?: Types.ObjectId | MediaDocument | null;
  externalUrl?: string | null;
  mediaType: MediaContentType;
}

const mediaContentSchema = new Schema<MediaContentDocument>({
  media: { type: Schema.Types.ObjectId, ref: "PictoMedia" },
  externalUrl: { type: String, trim: true },
  mediaType: { type: String, enum: ["IMAGE", "VIDEO", "GIF"],  required: true },
});

mediaContentSchema.pre("validate", function (next) {
  if (Boolean(this.media) === Boolean(this.externalUrl)) {
    return next(new Error("MediaContent needs exactly one of 'media' or 'externalUrl'"));
  }
  next();
});

const MediaContent = Content.discriminator<MediaContentDocument>(
  "MediaContent",
  mediaContentSchema
);

export default MediaContent;
