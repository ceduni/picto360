import mongoose, { Document, Schema } from "mongoose";

export type ContentType = "TextContent" | "LinkContent" | "MediaContent";

export interface ContentDocument extends Document {
  title: string;
  contentType?: ContentType;
}

export const baseContentFields = {
  title: { type: String, required: true },
};

const contentSchema = new Schema<ContentDocument>({
  ...baseContentFields,
},{
  _id:true,
  timestamps:true,
  discriminatorKey: "contentType",
});

const Content = mongoose.model<ContentDocument>("Content", contentSchema);

export default Content;
