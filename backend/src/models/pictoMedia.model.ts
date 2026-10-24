import mongoose, { Document, Schema, Types } from "mongoose";

// PENDING: an upload URL was handed out, but the file isn't confirmed yet.
// READY: the file is in storage and can be served.
// FAILED: the uploaded file was rejected (wrong size/type) and removed.
export type MediaStatus = "PENDING" | "READY" | "FAILED";

export interface MediaDocument extends Document {
  url?: string;
  name: string;
  owner?: Types.ObjectId;       // User who uploaded it
  playground?: Types.ObjectId;  // PictoPlayground it belongs to (used for access checks)
  status: MediaStatus;
  mimeType?: string;
  size?: number;                // bytes
}

const mediaSchema = new Schema<MediaDocument>({
  url: { type: String, required: false },  // only set for Cloudflare Images; R2 urls are presigned per request
  name: { type: String, required: false },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: false },
  playground: { type: Schema.Types.ObjectId, ref: "PictoPlayground", required: false, index: true },
  // Defaults to READY so records created before the direct-upload flow stay servable
  status: { type: String, enum: ["PENDING", "READY", "FAILED"], default: "READY", required: true },
  mimeType: { type: String, required: false },
  size: { type: Number, required: false },
},{
  timestamps:true
});

const PictoMedia = mongoose.model<MediaDocument>("PictoMedia", mediaSchema);


//=========================== Image Schema ===========================
// Stored in Cloudflare Images (non-GIF images up to its 10MB upload limit)

export interface ImageDocument extends MediaDocument {
  cloudflareImageId?: string; // Optional field for Cloudflare image ID
}

const imageSchema = new Schema<ImageDocument>({
  cloudflareImageId:{type:String, required:false}, // not required for forward/backward compatibility
},{
  timestamps:true
});

const PictoImage = PictoMedia.discriminator<ImageDocument>("PictoImage", imageSchema);


//=========================== R2 backed media ===========================
// GIFs, videos and images too large for Cloudflare Images (most 360°
// panoramas) are stored as-is in R2, addressed by their object key

export interface R2MediaDocument extends MediaDocument {
  r2Key?: string;
}

const videoSchema = new Schema<R2MediaDocument>({
  r2Key:{type:String, required:false},
},{
  timestamps:true
});

const PictoVideo = PictoMedia.discriminator<R2MediaDocument>("PictoVideo", videoSchema);

const gifSchema = new Schema<R2MediaDocument>({
  r2Key:{type:String, required:false},
},{
  timestamps:true
});

const PictoGif = PictoMedia.discriminator<R2MediaDocument>("PictoGif", gifSchema);

const r2ImageSchema = new Schema<R2MediaDocument>({
  r2Key:{type:String, required:false},
},{
  timestamps:true
});

const PictoR2Image = PictoMedia.discriminator<R2MediaDocument>("PictoR2Image", r2ImageSchema);

export { PictoMedia, PictoImage, PictoVideo, PictoGif, PictoR2Image };
