import path from "node:path";
import { Types } from "mongoose";
import {
  deleteImageFromImages,
  buildImageDeliveryUrl,
  getDirectUploadUrl,
  getImageFromImages,
  signPrivateImageURL,
} from "@/middlewares/cloudflare.images";
import { deleteFileFromR2, getR2DownloadUrl, getR2UploadUrl, headR2Object } from "@/middlewares/cloudflare.r2";
import {
  ImageDocument,
  MediaDocument,
  PictoGif,
  PictoImage,
  PictoMedia,
  PictoVideo,
  R2MediaDocument,
} from "@/models/pictoMedia.model";
import PictoPlayground, { PlaygroundDocument } from "@/models/pictoPlayground.model";
import { UserDocument } from "@/models/user.model";
import { PermissionAction } from "@/models/user_perm.model";
import permisionService from "./permission.service";

/*
  Media storage router (creator flow).

  - Non-GIF images go to Cloudflare Images.
  - GIFs and videos go to R2, untouched.

  Uploads never go through Fastify: the browser gets a direct upload URL from
  createUpload, sends the file straight to Cloudflare, then calls
  completeUpload so we can verify what actually landed in storage.
*/

export type MediaKind = "IMAGE" | "GIF" | "VIDEO";
export type MediaScope = "main" | "annotation";

const MB = 1024 * 1024;
const GB = 1024 * MB;

const MAX_SIZE: Record<MediaKind, number> = {
  IMAGE: 10 * MB, // Cloudflare Images upload limit
  GIF: 5 * GB,    // single presigned PUT, no multipart for now
  VIDEO: 5 * GB,
};

// How long a signed read URL stays valid. Videos get longer so playback
// doesn't break mid-session.
const ACCESS_URL_TTL_SECONDS: Record<MediaKind, number> = {
  IMAGE: 30 * 60,
  GIF: 60 * 60,
  VIDEO: 4 * 60 * 60,
};

const R2_UPLOAD_URL_TTL_SECONDS = 60 * 60;

export class MediaServiceError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}

export function classifyMimeType(mimeType: string): MediaKind | null {
  const mime = mimeType.toLowerCase();
  if (mime === "image/gif") return "GIF";
  if (mime.startsWith("image/")) return "IMAGE";
  if (mime.startsWith("video/")) return "VIDEO";
  return null;
}

function kindOf(media: MediaDocument): MediaKind {
  if (media instanceof PictoImage) return "IMAGE";
  if (media instanceof PictoGif) return "GIF";
  if (media instanceof PictoVideo) return "VIDEO";
  throw new MediaServiceError("Unknown media type", 500);
}

function fileExtension(filename: string, mimeType: string) {
  const fromName = path.extname(filename).toLowerCase().replace(/[^a-z0-9.]/g, "");
  if (fromName.length > 1 && fromName.length <= 10) return fromName;
  const subtype = mimeType.split("/")[1]?.replace(/[^a-z0-9]/gi, "").toLowerCase();
  return subtype ? `.${subtype}` : "";
}

// playgrounds/<playgroundId>/<main|annotations>/<mediaId>.<ext>
// Participant submissions can later live under playgrounds/<id>/submissions/<participantId>/
export function buildR2Key(playgroundId: Types.ObjectId | string, scope: MediaScope, mediaId: Types.ObjectId | string, ext: string) {
  const folder = scope === "main" ? "main" : "annotations";
  return `playgrounds/${playgroundId}/${folder}/${mediaId}${ext}`;
}

export interface CreateUploadInput {
  playgroundId: string;
  filename: string;
  mimeType: string;
  size: number;
  scope: MediaScope;
}

export interface UploadTicket {
  media: MediaDocument;
  provider: "CF_IMAGES" | "R2";
  uploadUrl: string;
  // CF Images: multipart/form-data POST with the file in a `file` field.
  // R2: raw body PUT, with exactly these headers.
  method: "POST" | "PUT";
  headers?: Record<string, string>;
}

class MediaService {

  async createUpload(user: UserDocument, input: CreateUploadInput): Promise<UploadTicket> {
    const { playgroundId, filename, mimeType, size, scope } = input;

    const kind = classifyMimeType(mimeType);
    if (!kind) throw new MediaServiceError(`Unsupported file type: ${mimeType}`, 415);
    if (!Number.isFinite(size) || size <= 0) throw new MediaServiceError("'size' must be a positive number of bytes", 400);
    if (size > MAX_SIZE[kind]) throw new MediaServiceError(`File too large for ${kind} (max ${MAX_SIZE[kind]} bytes)`, 413);

    if (!Types.ObjectId.isValid(playgroundId)) throw new MediaServiceError("Invalid playground id", 400);
    const playground = await PictoPlayground.findById(playgroundId);
    if (!playground) throw new MediaServiceError("Playground not found", 404);
    await this.authorize(user, playground, ["UPLOAD"]);

    const base = {
      name: filename,
      mimeType,
      size,
      owner: user._id,
      playground: playground._id,
      status: "PENDING" as const,
    };

    if (kind === "IMAGE") {
      const upload = await getDirectUploadUrl();
      if (!upload.id || !upload.uploadURL) throw new MediaServiceError("Cloudflare did not return an upload URL", 502);

      const media = await PictoImage.create({ ...base, cloudflareImageId: upload.id });
      return { media, provider: "CF_IMAGES", uploadUrl: upload.uploadURL, method: "POST" };
    }

    const Model = kind === "GIF" ? PictoGif : PictoVideo;
    const media = new Model(base);
    media.r2Key = buildR2Key(playground._id as Types.ObjectId, scope, media._id as Types.ObjectId, fileExtension(filename, mimeType));
    await media.save();

    const uploadUrl = await getR2UploadUrl(mimeType, media.r2Key, R2_UPLOAD_URL_TTL_SECONDS);
    return { media, provider: "R2", uploadUrl, method: "PUT", headers: { "Content-Type": mimeType } };
  }

  /**
   * Called by the browser once its direct upload finished. Checks the file
   * actually reached storage (and, for R2, that it matches what was
   * announced) before marking the media READY.
   */
  async completeUpload(user: UserDocument, mediaId: string) {
    const media = await this.getMedia(mediaId);
    await this.authorize(user, await this.playgroundOf(media), ["UPLOAD"]);

    if (media.status === "READY") return media;
    if (media.status === "FAILED") throw new MediaServiceError("This upload was rejected, start a new one", 409);

    const kind = kindOf(media);

    if (kind === "IMAGE") {
      const imageId = (media as ImageDocument).cloudflareImageId!;
      const image = await getImageFromImages(imageId);
      if (image.draft || !image.uploaded) throw new MediaServiceError("Upload not finished yet", 409);

      media.url = buildImageDeliveryUrl(imageId);
      media.status = "READY";
      await media.save();
      return media;
    }

    const r2Media = media as R2MediaDocument;
    const head = await headR2Object(r2Media.r2Key!);
    if (!head) throw new MediaServiceError("Upload not finished yet", 409);

    // The presigned PUT pins the Content-Type but not the size, so the size
    // cap can only be enforced here.
    if (head.size > MAX_SIZE[kind] || head.contentType !== media.mimeType) {
      await deleteFileFromR2(r2Media.r2Key!);
      media.status = "FAILED";
      await media.save();
      throw new MediaServiceError("Uploaded file does not match the announced size or type", 422);
    }

    media.size = head.size;
    media.status = "READY";
    await media.save();
    return media;
  }

  /**
   * Short lived URL the browser can read the file from. This is the single
   * place read access is decided, so the participant flow plugs in here.
   */
  async getAccessUrl(user: UserDocument, mediaId: string) {
    const media = await this.getMedia(mediaId);
    await this.authorize(user, await this.playgroundOf(media), ["VIEW"]);
    if (media.status !== "READY") throw new MediaServiceError("Media is not available yet", 409);

    const kind = kindOf(media);
    const ttl = ACCESS_URL_TTL_SECONDS[kind];

    const url = kind === "IMAGE"
      ? await signPrivateImageURL({ imageId: (media as ImageDocument).cloudflareImageId, expiryMinutes: ttl / 60 })
      : await getR2DownloadUrl((media as R2MediaDocument).r2Key!, ttl);

    return { url, kind, expiresAt: new Date(Date.now() + ttl * 1000) };
  }

  /** Removes the file from storage, the record, and its playground reference. */
  async deleteMedia(user: UserDocument, mediaId: string) {
    const media = await this.getMedia(mediaId);
    const playground = await this.playgroundOf(media);
    await this.authorize(user, playground, ["DELETE"]);

    if (kindOf(media) === "IMAGE") {
      const imageId = (media as ImageDocument).cloudflareImageId;
      if (imageId) await deleteImageFromImages(imageId);
    } else {
      const key = (media as R2MediaDocument).r2Key;
      if (key) await deleteFileFromR2(key);
    }

    await PictoPlayground.updateOne({ _id: playground._id }, { $pull: { main_medias: media._id } });
    await media.deleteOne();
  }

  private async getMedia(mediaId: string) {
    if (!Types.ObjectId.isValid(mediaId)) throw new MediaServiceError("Invalid media id", 400);
    const media = await PictoMedia.findById(mediaId);
    if (!media) throw new MediaServiceError("Media not found", 404);
    return media;
  }

  // Media created before the direct-upload flow has no `playground` field,
  // so fall back to the playground that lists it.
  private async playgroundOf(media: MediaDocument) {
    const playground = media.playground
      ? await PictoPlayground.findById(media.playground)
      : await PictoPlayground.findOne({ main_medias: media._id });
    if (!playground) throw new MediaServiceError("Media is not attached to a playground", 403);
    return playground;
  }

  // Access is decided at the playground level for now.
  private async authorize(user: UserDocument, playground: PlaygroundDocument, actions: PermissionAction[]) {
    const allowed = await permisionService.verifyUserPermForProject(user, playground, actions);
    if (!allowed) throw new MediaServiceError("You do not have permission on this playground", 403);
  }
}

export default new MediaService();
