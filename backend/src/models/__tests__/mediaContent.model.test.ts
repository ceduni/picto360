import { describe, it, expect } from "@jest/globals";
import { Types } from "mongoose";
import MediaContent from "@/models/content/mediaContent.model";

describe("MediaContent", () => {
  it("accepts an uploaded media", async () => {
    const content = new MediaContent({ title: "Image", mediaType: "IMAGE", media: new Types.ObjectId() });
    await expect(content.validate()).resolves.toBeUndefined();
  });

  it("accepts an external url", async () => {
    const content = new MediaContent({ title: "Vidéo", mediaType: "VIDEO", externalUrl: "https://youtu.be/abc" });
    await expect(content.validate()).resolves.toBeUndefined();
  });

  it("rejects neither or both", async () => {
    await expect(new MediaContent({ title: "GIF", mediaType: "GIF" }).validate()).rejects.toThrow(/exactly one/);
    await expect(
      new MediaContent({ title: "GIF", mediaType: "GIF", media: new Types.ObjectId(), externalUrl: "https://giphy.com/x" }).validate()
    ).rejects.toThrow(/exactly one/);
  });
});
