import { HotspotData, StoredViewerAsset } from "@/utils/Types";
import { prepareHotspotsForPictoExport } from "@/utils/HotspotAssetUtils";
import JSZip from "jszip";

type imageFormat = "picto";

interface MergedFileMetadata {
  version: string;
  format: imageFormat;
  created: string;
  imageInfo: {
    filename: string;
    format: string;
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
    imageBlob: Blob,
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

    const zip = new JSZip();
    const imageFilename = `image.${imageFormat}`;
    const bundledAssets = includeLocalFiles
      ? this.getBundledAssets(annotations || [], viewerAssets)
      : [];
    const exportedAnnotations = prepareHotspotsForPictoExport(
      annotations,
      includeLocalFiles,
    );

    zip.file(imageFilename, imageBlob);

    const metadata: MergedFileMetadata = {
      version: "1.0",
      format: customExtension.replace(".", "") as imageFormat,
      created: new Date().toISOString(),
      imageInfo: {
        filename: imageFilename,
        format: imageFormat,
        size: imageBlob.size,
      },
      annotationCount: exportedAnnotations?.length || 0,
      bundledAssetCount: bundledAssets.length,
      creator,
    };

    zip.file("metadata.json", JSON.stringify(metadata, null, 2));

    const annotationData = {
      version: "1.0",
      annotations: exportedAnnotations,
      statistics: {
        total: exportedAnnotations?.length || 0,
        types: [...new Set(exportedAnnotations?.map((annotation) => annotation.type))],
      },
    };
    zip.file("annotations.json", JSON.stringify(annotationData, null, 2));

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
      fileType: "Annotated Picto 360 Image",
      extension: customExtension,
      version: "1.1",
      creator,
      files: [
        { name: imageFilename, type: "image", description: "360 panoramic image" },
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
    zip.file("manifest.json", JSON.stringify(manifest, null, 2));

    const zipBlob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: compression },
      mimeType: customMimeType,
    });

    return zipBlob;
  }

  static async extractCustomFile(customBlob: Blob): Promise<{
    imageBlob: Blob;
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

    const imageFile = zip.file(metadata.imageInfo.filename);
    if (!imageFile) {
      throw new Error("Invalid custom 360 file: missing image");
    }
    const imageBlob = await imageFile.async("blob");

    const assets = await this.extractBundledAssets(zip, manifest?.embeddedAssets);

    return {
      imageBlob,
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

        return {
          id: entry.id,
          blob: await assetFile.async("blob"),
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
