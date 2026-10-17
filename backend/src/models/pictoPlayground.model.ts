import mongoose, { Document, Schema, Types } from "mongoose";
import { AnnotationDocument } from "./annotation.model";
import { MediaDocument } from "./pictoMedia.model";


// A Playground represents what we currently have as the zip file in the front-end
// It contains images/videos and annotations and is different from the activities
export interface PlaygroundDocument extends Document {
  name: string;
  annotations:[AnnotationDocument]
  main_medias:[MediaDocument]
}

const playgroundSchema = new Schema<PlaygroundDocument>({
  name: { type: String, required: true },
  main_medias:{type:[Types.ObjectId], ref:"PictoMedia",  required:true},
  annotations:{type: [Types.ObjectId], ref:"Annotation"},
},{
  _id:true,
  timestamps:true
});

const PictoPlayground = mongoose.model<PlaygroundDocument>("PictoPlayground", playgroundSchema);

export default PictoPlayground;
