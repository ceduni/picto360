import { HotspotData, StoredViewerAsset } from "@/utils/Types";
import { prepareHotspotsForPictoExport } from "@/utils/HotspotAssetUtils";
import JSZip from "jszip";

type imageFormat = "picto";
type MediaKind = "image" | "video";

interface MergedFileMetadata {
  version: string;
  format: imageFormat;
  created: string;
  /**
   * v1 files only have imageInfo. v2 files add mediaInfo (image or video)
   * and keep imageInfo for backward compatibility when the media is an image.
   */
  imageInfo?: {
    filename: string;
    format: string;
    size: number;
    dimensions?: { width: number; height: number };
  };
  mediaInfo?: {
    kind: MediaKind;
    filename: string;
    mimeType: string;
    size: number;
    dimensions?: { width: number; height: number };
  };
  annotationCount: number;
  bundledAssetCount: number;
  creator: string;
}

interface PictoAssetManifestEntry {
  id: string;
  path: string;
  fileName: string;
  mimeType: string;
  kind: StoredViewerAsset["kind"];
  size: number;
}

export class CustomFileExporter {
  private static readonly EXTENSION = ".picto";
  private static readonly MIME_TYPE = "application/picto";

  static async createPictoFile(
    mediaBlob: Blob,
    annotations?: HotspotData[],
    options: {
      filename?: string;
      imageFormat?: "jpg" | "png";
      compression?: number;
      creator?: string;
      customExtension?: string;
      customMimeType?: string;
      includeLocalFiles?: boolean;
      viewerAssets?: StoredViewerAsset[];
    } = {},
  ): Promise<Blob> {
    const {
      imageFormat = "jpg",
      compression = 6,
      creator = "MyPictoApp",
      customExtension = this.EXTENSION,
      customMimeType = this.MIME_TYPE,
      includeLocalFiles = false,
      viewerAssets = [],
    } = options;

    // v2: the media can be a 360 image or a 360 video, auto-detected from the
    // blob MIME type so every existing call site keeps working.
    const mediaKind = this.resolveMediaKind(mediaBlob);
    const mediaFilename = mediaKind === "video" ? "video.mp4" : `image.${imageFormat}`;
    const mediaMimeType = mediaBlob.type || (mediaKind === "video" ? "video/mp4" : "image/jpeg");

    const zip = new JSZip();
    const bundledAssets = includeLocalFiles
      ? this.getBundledAssets(annotations || [], viewerAssets)
      : [];
    const exportedAnnotations = prepareHotspotsForPictoExport(
      annotations,
      includeLocalFiles,
    );

    // Media is already compressed (JPEG/MP4/WebM): storing it without DEFLATE
    // avoids a useless CPU pass for a size difference measured at ±2%.
    zip.file(mediaFilename, mediaBlob, { compression: "STORE" });

    const metadata: MergedFileMetadata = {
      version: "1.1",
      format: customExtension.replace(".", "") as imageFormat,
      created: new Date().toISOString(),
      ...(mediaKind === "image"
        ? { imageInfo: { filename: mediaFilename, format: imageFormat, size: mediaBlob.size } }
        : {}),
      mediaInfo: {
        kind: mediaKind,
        filename: mediaFilename,
        mimeType: mediaMimeType,
        size: mediaBlob.size,
      },
      annotationCount: exportedAnnotations?.length || 0,
      bundledAssetCount: bundledAssets.length,
      creator,
    };

    // v2: JSON payloads are minified (they are tiny; indentation only adds bytes).
    // The caller-provided compression level (default 6) applies to the JSON only.
    const jsonCompression = { compression: "DEFLATE" as const, compressionOptions: { level: Math.min(compression, 9) } };
    zip.file("metadata.json", JSON.stringify(metadata), jsonCompression);

    const annotationData = {
      version: "1.0",
      annotations: exportedAnnotations,
      statistics: {
        total: exportedAnnotations?.length || 0,
        types: [...new Set(exportedAnnotations?.map((annotation) => annotation.type))],
      },
    };
    zip.file("annotations.json", JSON.stringify(annotationData), jsonCompression);

    const assetEntries: PictoAssetManifestEntry[] = bundledAssets.map((asset) => {
      const assetPath = `assets/${asset.id}-${sanitizeFilename(asset.fileName)}`;
      zip.file(assetPath, asset.blob);

      return {
        id: asset.id,
        path: assetPath,
        fileName: asset.fileName,
        mimeType: asset.mimeType,
        kind: asset.kind,
        size: asset.blob.size,
      };
    });

    const manifest = {
      fileType: mediaKind === "video" ? "Annotated Picto 360 Video" : "Annotated Picto 360 Image",
      extension: customExtension,
      version: "1.2",
      creator,
      mediaKind,
      files: [
        { name: mediaFilename, type: mediaKind, description: `360 panoramic ${mediaKind}` },
        { name: "metadata.json", type: "metadata", description: "File metadata and information" },
        { name: "annotations.json", type: "annotations", description: "Annotation data" },
        { name: "manifest.json", type: "manifest", description: "File structure description" },
        ...assetEntries.map((asset) => ({
          name: asset.path,
          type: asset.kind,
          description: `${asset.kind} hotspot asset`,
        })),
      ],
      embeddedAssets: assetEntries,
    };
    zip.file("manifest.json", JSON.stringify(manifest), jsonCompression);

    const zipBlob = await zip.generateAsync({
      type: "blob",
      mimeType: customMimeType,
    });

    return zipBlob;
  }

  private static resolveMediaKind(blob: Blob): MediaKind {
    if (blob.type.startsWith("video/")) {
      return "video";
    }
    return "image";
  }

  static async extractCustomFile(customBlob: Blob): Promise<{
    /** 360 media (image or video). `imageBlob` is kept as a deprecated alias. */
    mediaBlob: Blob;
    imageBlob: Blob;
    mediaKind: MediaKind;
    annotations: HotspotData[];
    assets: StoredViewerAsset[];
    metadata: MergedFileMetadata;
    manifest: unknown;
  }> {
    const zip = await JSZip.loadAsync(customBlob);

    const manifestFile = zip.file("manifest.json");
    if (!manifestFile) {
      throw new Error("Invalid custom 360 file: missing manifest");
    }
    const manifest = JSON.parse(await manifestFile.async("string"));

    const metadataFile = zip.file("metadata.json");
    if (!metadataFile) {
      throw new Error("Invalid custom 360 file: missing metadata");
    }
    const metadata = JSON.parse(await metadataFile.async("string"));

    const annotationsFile = zip.file("annotations.json");
    if (!annotationsFile) {
      throw new Error("Invalid custom 360 file: missing annotations");
    }
    const annotationData = JSON.parse(await annotationsFile.async("string"));

    // v2 files describe their media in mediaInfo; v1 files only have imageInfo.
    const mediaKind: MediaKind = metadata.mediaInfo?.kind ?? "image";
    const mediaFilename = metadata.mediaInfo?.filename ?? metadata.imageInfo?.filename;
    const mediaMimeType = metadata.mediaInfo?.mimeType
      ?? getImageMimeType(metadata.imageInfo?.format);

    if (!mediaFilename) {
      throw new Error("Invalid custom 360 file: missing media entry");
    }
    const mediaFile = zip.file(mediaFilename);
    if (!mediaFile) {
      throw new Error(`Invalid custom 360 file: missing media ${mediaFilename}`);
    }
    const mediaBlob = new Blob(
      [await mediaFile.async("arraybuffer")],
      { type: mediaMimeType || "application/octet-stream" },
    );

    const assets = await this.extractBundledAssets(zip, manifest?.embeddedAssets);

    return {
      mediaBlob,
      imageBlob: mediaBlob,
      mediaKind,
      annotations: annotationData.annotations || [],
      assets,
      metadata,
      manifest,
    };
  }

  private static async extractBundledAssets(
    zip: JSZip,
    assetEntries: PictoAssetManifestEntry[] = [],
  ): Promise<StoredViewerAsset[]> {
    const assets = await Promise.all(
      assetEntries.map(async (entry) => {
        const assetFile = zip.file(entry.path);
        if (!assetFile) {
          throw new Error(`Invalid custom 360 file: missing asset ${entry.path}`);
        }

        const assetBlob = new Blob(
          [await assetFile.async("arraybuffer")],
          { type: entry.mimeType || "application/octet-stream" },
        );

        return {
          id: entry.id,
          blob: assetBlob,
          fileName: entry.fileName,
          mimeType: entry.mimeType,
          kind: entry.kind,
        } satisfies StoredViewerAsset;
      }),
    );

    return assets;
  }

  private static getBundledAssets(
    annotations: HotspotData[],
    viewerAssets: StoredViewerAsset[],
  ): StoredViewerAsset[] {
    const referencedIds = new Set(
      annotations
        .filter((annotation) => annotation.assetSource === "local" && annotation.assetId)
        .map((annotation) => annotation.assetId as string),
    );

    return viewerAssets.filter((asset) => referencedIds.has(asset.id));
  }
}

function sanitizeFilename(fileName: string): string {
  return fileName.replace(/[<>:"/\\|?*]+/g, "_");
}

function getImageMimeType(format?: string): string {
  switch (format?.toLowerCase()) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}
