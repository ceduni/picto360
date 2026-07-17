import mongoose, { Document, Schema } from "mongoose";

export interface ImageDocument extends Document {
  url: string;
  name: string;
}

const imageSchema = new Schema<ImageDocument>({
  url: { type: String, required: true },
  name: { type: String, required: false },
},{
  timestamps:true
});

const PictoImage = mongoose.model<ImageDocument>("PictoImage", imageSchema);

export default PictoImage;
