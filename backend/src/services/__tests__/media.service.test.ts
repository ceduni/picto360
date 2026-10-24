import { describe, it, expect, beforeEach, jest } from "@jest/globals";

// ── Mocks ──────────────────────────────────────────────────────────────────
jest.mock("@/middlewares/cloudflare.images", () => ({
  getDirectUploadUrl: jest.fn(),
  buildImageDeliveryUrl: jest.fn((id: string) => `https://imagedelivery.net/hash/${id}/public`),
  getImageFromImages: jest.fn(),
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
  return { PictoMedia: { findById: jest.fn(), find: jest.fn() }, PictoImage, PictoGif, PictoVideo };
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
import { PictoMedia, PictoGif, PictoVideo } from "@/models/pictoMedia.model";
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
  it("routes GIFs and videos away from Cloudflare Images", () => {
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

  it("hands out a Cloudflare Images direct upload URL for images", async () => {
    m(images.getDirectUploadUrl).mockResolvedValue({ id: "cf-id", uploadURL: "https://upload.imagedelivery.net/x" });

    const ticket = await MediaService.createUpload(user, input);

    expect(ticket).toMatchObject({ provider: "CF_IMAGES", method: "POST", uploadUrl: "https://upload.imagedelivery.net/x" });
    expect(ticket.media).toMatchObject({ cloudflareImageId: "cf-id", status: "PENDING", playground: PLAYGROUND_ID });
    expect(r2.getR2UploadUrl).not.toHaveBeenCalled();
  });

  it("hands out a presigned R2 PUT for GIFs", async () => {
    m(r2.getR2UploadUrl).mockResolvedValue("https://r2/presigned");

    const ticket = await MediaService.createUpload(user, { ...input, filename: "fun.gif", mimeType: "image/gif" });

    expect(ticket).toMatchObject({ provider: "R2", method: "PUT", headers: { "Content-Type": "image/gif" } });
    expect(ticket.media).toBeInstanceOf(PictoGif);
    expect(r2.getR2UploadUrl).toHaveBeenCalledWith("image/gif", `playgrounds/${PLAYGROUND_ID}/main/650000000000000000000abc.gif`, 3600);
    expect(images.getDirectUploadUrl).not.toHaveBeenCalled();
  });

  it("accepts videos up to 5GB in R2", async () => {
    m(r2.getR2UploadUrl).mockResolvedValue("https://r2/presigned");

    const ticket = await MediaService.createUpload(user, { ...input, filename: "tour.mp4", mimeType: "video/mp4", size: 5 * GB, scope: "annotation" });

    expect(ticket.media).toBeInstanceOf(PictoVideo);
    expect((ticket.media as any).r2Key).toBe(`playgrounds/${PLAYGROUND_ID}/annotations/650000000000000000000abc.mp4`);
  });

  it("rejects videos over 5GB and images over the Cloudflare Images limit", async () => {
    await expectMediaError(MediaService.createUpload(user, { ...input, mimeType: "video/mp4", size: 5 * GB + 1 }), 413);
    await expectMediaError(MediaService.createUpload(user, { ...input, size: 11 * 1024 * 1024 }), 413);
  });

  it("rejects unsupported types", async () => {
    await expectMediaError(MediaService.createUpload(user, { ...input, mimeType: "application/zip" }), 415);
  });

  it("requires UPLOAD on the playground", async () => {
    m(permisionService.verifyUserPermForProject).mockResolvedValue(false);

    await expectMediaError(MediaService.createUpload(user, input), 403);
    expect(permisionService.verifyUserPermForProject).toHaveBeenCalledWith(user, playground, ["UPLOAD"]);
    expect(images.getDirectUploadUrl).not.toHaveBeenCalled();
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

  it("refuses to complete before the file is in R2", async () => {
    const media = new (PictoVideo as any)({ playground: PLAYGROUND_ID, status: "PENDING", mimeType: "video/mp4", r2Key: "k" });
    m(PictoMedia.findById).mockResolvedValue(media);
    m(r2.headR2Object).mockResolvedValue(null);

    await expectMediaError(MediaService.completeUpload(user, "650000000000000000000abc"), 409);
    expect(media.status).toBe("PENDING");
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

  it("refuses without VIEW on the playground", async () => {
    m(permisionService.verifyUserPermForProject).mockResolvedValue(false);

    await expectMediaError(MediaService.getAccessUrlsForPlayground(user, PLAYGROUND_ID, [VIDEO_ID]), 403);
    expect(PictoMedia.find).not.toHaveBeenCalled();
  });
});
