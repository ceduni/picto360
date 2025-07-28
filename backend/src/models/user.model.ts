import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  firebaseUid: string;
  email: string;
  displayName?: string;
  photoUrl?: string;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  displayName: { type: String },
  photoUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<UserDocument>("User", userSchema);