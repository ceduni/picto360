import mongoose, { Document, Schema } from "mongoose";

export interface MediaDocument extends Document {
  url: string;
  name: string;
}

const mediaSchema = new Schema<MediaDocument>({
  url: { type: String, required: true },
  name: { type: String, required: false },
},{
  timestamps:true
});

const PictoMedia = mongoose.model<MediaDocument>("PictoMedia", mediaSchema);


//=========================== Image Schema ===========================

export interface ImageDocument extends MediaDocument {
  cloudflareImageId?: string; // Optional field for Cloudflare image ID
}

const imageSchema = new Schema<ImageDocument>({
  cloudflareImageId:{type:String, required:false}, // not required for forward/backward compatibility
},{
  timestamps:true
});

const PictoImage = PictoMedia.discriminator<ImageDocument>("PictoImage", imageSchema);


//=========================== Video Schema ===========================
export interface VideoDocument extends MediaDocument {
  cloudflareR2Id?: string; // Optional field for Cloudflare video ID
}

const videoSchema = new Schema<VideoDocument>({
  cloudflareR2Id:{type:String, required:false}, // not required for forward/backward compatibility
},{
  timestamps:true
});

const PictoVideo = PictoMedia.discriminator<VideoDocument>("PictoVideo", videoSchema);

export { PictoImage, PictoVideo};
