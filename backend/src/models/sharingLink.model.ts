import mongoose, { Document, Schema } from "mongoose";

export interface SharingLinkDocument extends Document {
  id: string;
  url: string;
  expirationDate: Date;
  creationDate: Date;
  lastModificationDate: Date;
  projectId: string; // assuming a sharing link is related to a project
}

const sharingLinkSchema = new Schema<SharingLinkDocument>({
  id: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  lastModificationDate: { type: Date, default: Date.now, required: true },
  projectId: { type: String, required: true }, // reference to the related project
});

const SharingLink = mongoose.model<SharingLinkDocument>(
  "SharingLink",
  sharingLinkSchema
);

export default SharingLink;
