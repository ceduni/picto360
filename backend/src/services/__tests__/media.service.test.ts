import { describe, it, expect, beforeEach, jest } from "@jest/globals";

// ── Mocks ──────────────────────────────────────────────────────────────────
jest.mock("@/middlewares/cloudflare.images", () => ({
  signPrivateImageURL: jest.fn(),
  deleteImageFromImages: jest.fn(),
}));

jest.mock("@/middlewares/cloudflare.r2", () => ({
  getR2UploadUrl: jest.fn(),
  getR2DownloadUrl: jest.fn(),
  headR2Object: jest.fn(),
  deleteFileFromR2: jest.fn(),
}));

jest.mock("@/models/pictoMedia.model", () => {
  class FakeMedia {
    _id = "650000000000000000000abc";
    [key: string]: unknown;
    constructor(data: Record<string, unknown>) { Object.assign(this, data); }
    async save() { return this; }
    async deleteOne() { return this; }
  }
  class PictoImage extends FakeMedia {
    static create = jest.fn(async (data: Record<string, unknown>) => new PictoImage(data));
  }
  class PictoGif extends FakeMedia {}
  class PictoVideo extends FakeMedia {}
  class PictoR2Image extends FakeMedia {}
  return { PictoMedia: { findById: jest.fn(), find: jest.fn() }, PictoImage, PictoGif, PictoVideo, PictoR2Image };
});

jest.mock("@/models/pictoPlayground.model", () => ({
  __esModule: true,
  default: { findById: jest.fn(), findOne: jest.fn(), updateOne: jest.fn() },
}));

jest.mock("@/services/permission.service", () => ({
  __esModule: true,
  default: { verifyUserPermForProject: jest.fn() },
}));

import MediaService, { classifyMimeType, buildR2Key, MediaServiceError } from "@/services/media.service";
import * as images from "@/middlewares/cloudflare.images";
import * as r2 from "@/middlewares/cloudflare.r2";
import { PictoMedia, PictoGif, PictoImage, PictoVideo, PictoR2Image } from "@/models/pictoMedia.model";
import PictoPlayground from "@/models/pictoPlayground.model";
import permisionService from "@/services/permission.service";

const m = <T>(fn: T) => fn as unknown as jest.Mock<(...args: any[]) => any>;

const PLAYGROUND_ID = "650000000000000000000001";
const user = { _id: "650000000000000000000002" } as any;
const playground = { _id: PLAYGROUND_ID };

const GB = 1024 ** 3;

beforeEach(() => {
  jest.clearAllMocks();
  m(PictoPlayground.findById).mockResolvedValue(playground);
  m(permisionService.verifyUserPermForProject).mockResolvedValue(true);
});

async function expectMediaError(promise: Promise<unknown>, statusCode: number) {
  await expect(promise).rejects.toBeInstanceOf(MediaServiceError);
  await promise.catch((e: MediaServiceError) => expect(e.statusCode).toBe(statusCode));
}

describe("classifyMimeType", () => {
  it("tells images, GIFs and videos apart", () => {
    expect(classifyMimeType("image/jpeg")).toBe("IMAGE");
    expect(classifyMimeType("image/GIF")).toBe("GIF");
    expect(classifyMimeType("video/mp4")).toBe("VIDEO");
    expect(classifyMimeType("application/pdf")).toBeNull();
  });
});

describe("buildR2Key", () => {
  it("nests files by playground and scope", () => {
    expect(buildR2Key("p1", "main", "m1", ".mp4")).toBe("playgrounds/p1/main/m1.mp4");
    expect(buildR2Key("p1", "annotation", "m1", ".gif")).toBe("playgrounds/p1/annotations/m1.gif");
  });
});

describe("createUpload", () => {
  const input = { playgroundId: PLAYGROUND_ID, filename: "pano.jpg", mimeType: "image/jpeg", size: 1024, scope: "main" as const };

  it("hands out a presigned R2 PUT for images", async () => {
    m(r2.getR2UploadUrl).mockResolvedValue("https://r2/presigned");

    const ticket = await MediaService.createUpload(user, input);

    expect(ticket).toMatchObject({ uploadUrl: "https://r2/presigned", headers: { "Content-Type": "image/jpeg" } });
    expect(ticket.media).toBeInstanceOf(PictoR2Image);
    expect(ticket.media).toMatchObject({ status: "PENDING", playground: PLAYGROUND_ID });
    expect(r2.getR2UploadUrl).toHaveBeenCalledWith("image/jpeg", `playgrounds/${PLAYGROUND_ID}/main/650000000000000000000abc.jpg`, 3600);
  });

  it("hands out a presigned R2 PUT for GIFs", async () => {
    m(r2.getR2UploadUrl).mockResolvedValue("https://r2/presigned");

    const ticket = await MediaService.createUpload(user, { ...input, filename: "fun.gif", mimeType: "image/gif" });

    expect(ticket).toMatchObject({ headers: { "Content-Type": "image/gif" } });
    expect(ticket.media).toBeInstanceOf(PictoGif);
    expect(r2.getR2UploadUrl).toHaveBeenCalledWith("image/gif", `playgrounds/${PLAYGROUND_ID}/main/650000000000000000000abc.gif`, 3600);
  });

  it("accepts videos up to 5GB in R2", async () => {
    m(r2.getR2UploadUrl).mockResolvedValue("https://r2/presigned");

    const ticket = await MediaService.createUpload(user, { ...input, filename: "tour.mp4", mimeType: "video/mp4", size: 5 * GB, scope: "annotation" });

    expect(ticket.media).toBeInstanceOf(PictoVideo);
    expect((ticket.media as any).r2Key).toBe(`playgrounds/${PLAYGROUND_ID}/annotations/650000000000000000000abc.mp4`);
  });

  it("accepts large 360° panoramas (well over 10MB)", async () => {
    m(r2.getR2UploadUrl).mockResolvedValue("https://r2/presigned");

    const ticket = await MediaService.createUpload(user, { ...input, size: 48 * 1024 * 1024 });

    expect(ticket.media).toBeInstanceOf(PictoR2Image);
  });

  it("rejects any file over 5GB", async () => {
    await expectMediaError(MediaService.createUpload(user, { ...input, mimeType: "video/mp4", size: 5 * GB + 1 }), 413);
    await expectMediaError(MediaService.createUpload(user, { ...input, size: 5 * GB + 1 }), 413);
  });

  it("rejects unsupported types", async () => {
    await expectMediaError(MediaService.createUpload(user, { ...input, mimeType: "application/zip" }), 415);
  });

  it("requires UPLOAD on the playground", async () => {
    m(permisionService.verifyUserPermForProject).mockResolvedValue(false);

    await expectMediaError(MediaService.createUpload(user, input), 403);
    expect(permisionService.verifyUserPermForProject).toHaveBeenCalledWith(user, playground, ["UPLOAD"]);
    expect(r2.getR2UploadUrl).not.toHaveBeenCalled();
  });
});

describe("completeUpload", () => {
  it("marks an R2 upload READY with its real size", async () => {
    const media = new (PictoVideo as any)({ playground: PLAYGROUND_ID, status: "PENDING", mimeType: "video/mp4", r2Key: "k" });
    m(PictoMedia.findById).mockResolvedValue(media);
    m(r2.headR2Object).mockResolvedValue({ size: 2048, contentType: "video/mp4" });

    const result = await MediaService.completeUpload(user, "650000000000000000000abc");

    expect(result).toMatchObject({ status: "READY", size: 2048 });
  });

  it("deletes and fails an R2 upload whose type doesn't match", async () => {
    const media = new (PictoVideo as any)({ playground: PLAYGROUND_ID, status: "PENDING", mimeType: "video/mp4", r2Key: "k" });
    m(PictoMedia.findById).mockResolvedValue(media);
    m(r2.headR2Object).mockResolvedValue({ size: 2048, contentType: "text/html" });

    await expectMediaError(MediaService.completeUpload(user, "650000000000000000000abc"), 422);
    expect(r2.deleteFileFromR2).toHaveBeenCalledWith("k");
    expect(media.status).toBe("FAILED");
  });

  it("refuses to complete a pending Cloudflare Images upload from before the move to R2", async () => {
    const media = new (PictoImage as any)({ playground: PLAYGROUND_ID, status: "PENDING", cloudflareImageId: "cf-id" });
    m(PictoMedia.findById).mockResolvedValue(media);

    await expectMediaError(MediaService.completeUpload(user, "650000000000000000000abc"), 409);
    expect(r2.headR2Object).not.toHaveBeenCalled();
  });

  it("refuses to complete before the file is in R2", async () => {
    const media = new (PictoVideo as any)({ playground: PLAYGROUND_ID, status: "PENDING", mimeType: "video/mp4", r2Key: "k" });
    m(PictoMedia.findById).mockResolvedValue(media);
    m(r2.headR2Object).mockResolvedValue(null);

    await expectMediaError(MediaService.completeUpload(user, "650000000000000000000abc"), 409);
    expect(media.status).toBe("PENDING");
  });
});

describe("abortUpload", () => {
  it("removes a PENDING record and whatever reached R2", async () => {
    const media = new (PictoR2Image as any)({ playground: PLAYGROUND_ID, status: "PENDING", r2Key: "k" });
    const deleteOne = jest.spyOn(media, "deleteOne");
    m(PictoMedia.findById).mockResolvedValue(media);

    await MediaService.abortUpload(user, "650000000000000000000abc");

    expect(permisionService.verifyUserPermForProject).toHaveBeenCalledWith(user, playground, ["UPLOAD"]);
    expect(r2.deleteFileFromR2).toHaveBeenCalledWith("k");
    expect(deleteOne).toHaveBeenCalled();
  });

  it("also clears a FAILED record", async () => {
    const media = new (PictoVideo as any)({ playground: PLAYGROUND_ID, status: "FAILED", r2Key: "k" });
    const deleteOne = jest.spyOn(media, "deleteOne");
    m(PictoMedia.findById).mockResolvedValue(media);

    await MediaService.abortUpload(user, "650000000000000000000abc");

    expect(deleteOne).toHaveBeenCalled();
  });

  it("never deletes a READY media", async () => {
    const media = new (PictoR2Image as any)({ playground: PLAYGROUND_ID, status: "READY", r2Key: "k" });
    const deleteOne = jest.spyOn(media, "deleteOne");
    m(PictoMedia.findById).mockResolvedValue(media);

    await expectMediaError(MediaService.abortUpload(user, "650000000000000000000abc"), 409);
    expect(r2.deleteFileFromR2).not.toHaveBeenCalled();
    expect(deleteOne).not.toHaveBeenCalled();
  });

  it("requires UPLOAD on the playground", async () => {
    const media = new (PictoR2Image as any)({ playground: PLAYGROUND_ID, status: "PENDING", r2Key: "k" });
    m(PictoMedia.findById).mockResolvedValue(media);
    m(permisionService.verifyUserPermForProject).mockResolvedValue(false);

    await expectMediaError(MediaService.abortUpload(user, "650000000000000000000abc"), 403);
    expect(r2.deleteFileFromR2).not.toHaveBeenCalled();
  });
});

describe("getAccessUrlsForPlayground", () => {
  const VIDEO_ID = "650000000000000000000abc";

  it("checks VIEW once and signs only READY media of that playground", async () => {
    const video = new (PictoVideo as any)({ playground: PLAYGROUND_ID, status: "READY", r2Key: "k" });
    m(PictoMedia.find).mockResolvedValue([video]);
    m(r2.getR2DownloadUrl).mockResolvedValue("https://r2/signed");

    const result = await MediaService.getAccessUrlsForPlayground(user, PLAYGROUND_ID, [VIDEO_ID, "not-an-id"]);

    expect(permisionService.verifyUserPermForProject).toHaveBeenCalledTimes(1);
    expect(permisionService.verifyUserPermForProject).toHaveBeenCalledWith(user, playground, ["VIEW"]);
    expect(PictoMedia.find).toHaveBeenCalledWith({ _id: { $in: [VIDEO_ID] }, playground: PLAYGROUND_ID, status: "READY" });
    expect(r2.getR2DownloadUrl).toHaveBeenCalledWith("k", 4 * 60 * 60);
    expect(result.get(VIDEO_ID)).toMatchObject({ url: "https://r2/signed", kind: "VIDEO" });
  });

  it("signs R2-stored images through R2, with the image TTL", async () => {
    const pano = new (PictoR2Image as any)({ _id: "650000000000000000000abd", playground: PLAYGROUND_ID, status: "READY", r2Key: "pano" });
    m(PictoMedia.find).mockResolvedValue([pano]);
    m(r2.getR2DownloadUrl).mockResolvedValue("https://r2/pano");

    const result = await MediaService.getAccessUrlsForPlayground(user, PLAYGROUND_ID, [VIDEO_ID]);

    expect(images.signPrivateImageURL).not.toHaveBeenCalled();
    expect(r2.getR2DownloadUrl).toHaveBeenCalledWith("pano", 30 * 60);
    expect([...result.values()][0]).toMatchObject({ url: "https://r2/pano", kind: "IMAGE" });
  });

  it("still signs images stored in Cloudflare Images before the move to R2", async () => {
    const legacy = new (PictoImage as any)({ _id: "650000000000000000000abe", playground: PLAYGROUND_ID, status: "READY", cloudflareImageId: "cf-id" });
    m(PictoMedia.find).mockResolvedValue([legacy]);
    m(images.signPrivateImageURL).mockResolvedValue("https://imagedelivery.net/signed");

    const result = await MediaService.getAccessUrlsForPlayground(user, PLAYGROUND_ID, [VIDEO_ID]);

    expect(images.signPrivateImageURL).toHaveBeenCalledWith({ imageId: "cf-id", expiryMinutes: 30 });
    expect(r2.getR2DownloadUrl).not.toHaveBeenCalled();
    expect([...result.values()][0]).toMatchObject({ url: "https://imagedelivery.net/signed", kind: "IMAGE" });
  });

  it("refuses without VIEW on the playground", async () => {
    m(permisionService.verifyUserPermForProject).mockResolvedValue(false);

    await expectMediaError(MediaService.getAccessUrlsForPlayground(user, PLAYGROUND_ID, [VIDEO_ID]), 403);
    expect(PictoMedia.find).not.toHaveBeenCalled();
  });
});
