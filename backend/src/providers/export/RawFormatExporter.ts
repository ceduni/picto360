import { BaseExportFormatter } from "./IExportFormatter";
import { HotspotData, ExportOptions, ExportResult } from "@/types/export.types";
import { IStorageProvider, StorageFileMetadata } from "@/providers/storage/IStorageProvider";
import { UploadProgressCallback } from "@/types/export.types";

const MEDIA_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

/**
 * Raw format exporter - separates media and annotations into separate files
 */
export class RawFormatExporter extends BaseExportFormatter {
  async export(
    fileBuffer: Buffer,
    annotations: HotspotData[] | undefined,
    options: ExportOptions,
    storage: IStorageProvider,
    folderId: string,
    onProgress?: UploadProgressCallback,
  ): Promise<Partial<ExportResult>> {
    const { fileName = "annotated_360_image", includeMetadata = true } = options;

    // v2: the media may be an image OR a video — name the file from its
    // actual MIME type instead of assuming a .jpg.
    const mimeType = options.mimeType && MEDIA_EXTENSIONS[options.mimeType]
      ? options.mimeType
      : "image/jpeg";
    const extension = MEDIA_EXTENSIONS[mimeType];
    const isVideo = mimeType.startsWith("video/");
    const baseName = fileName.includes(".")
      ? fileName.replace(/\.[a-zA-Z0-9]+$/, "")
      : fileName;
    const mediaFileName = `${baseName}.${extension}`;

    if (!annotations) {
      annotations = [];
    }

    // Upload media
    const imageMetadata: StorageFileMetadata = includeMetadata
      ? {
          name: mediaFileName,
          mimeType,
          metadata: {
            app: "picto360",
            annotationCount: annotations.length.toString(),
            exportDate: new Date().toISOString(),
            imageType: isVideo ? "360degree-video" : "360degree",
          },
        }
      : {
          name: mediaFileName,
          mimeType,
          metadata: {
            app: "picto360",
          },
        };

    const imageResult = await storage.uploadFile(fileBuffer, imageMetadata , folderId, onProgress);

    // Upload annotations
    const annotationData = {
      version: "1.0",
      imageFileId: imageResult.id,
      exportDate: new Date().toISOString(),
      annotations: annotations,
      metadata: {
        totalAnnotations: annotations.length,
        annotationTypes: [...new Set(annotations.map((a) => a.type))],
      },
    };

    const annotationFileName = `${baseName}_annotations.json`;
    const annotationBuffer = Buffer.from(JSON.stringify(annotationData, null, 2));

    const annotationMetadata : StorageFileMetadata = {
      name: annotationFileName,
      mimeType: "application/json",
      metadata: {
        app: "picto360",
        dataType: "annotations",
        relatedImageId: imageResult.id,
      },
    };

    const annotationResult = await storage.uploadFile(
      annotationBuffer,
      annotationMetadata ,
      folderId,
      onProgress,
    );

    return {
      imageFile: imageResult,
      annotationFile: annotationResult,
    };
  }
}
