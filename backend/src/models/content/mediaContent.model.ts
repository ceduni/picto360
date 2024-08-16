import mongoose, { Document, Schema } from "mongoose";

export interface MediaContentDocument extends Document {
  id: string;
  creationDate: Date;
  lastModificationDate: Date;
  title: string;
  mediaType: string;
  url: string;
}

const mediaContentSchema = new Schema<MediaContentDocument>({
  id: { type: String, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  lastModificationDate: { type: Date, default: Date.now, required: true },
  title: { type: String, required: true },
  mediaType: { type: String, required: true }, // e.g., 'image', 'video', etc.
  url: { type: String, required: true },
});

const MediaContent = mongoose.model<MediaContentDocument>(
  "MediaContent",
  mediaContentSchema
);

export default MediaContent;
