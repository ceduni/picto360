import { BaseExportFormatter } from "./IExportFormatter";
import { HotspotData, ExportOptions, ExportResult } from "@/types/export.types";
import { IStorageProvider, StorageFileMetadata } from "@/providers/storage/IStorageProvider";
import { UploadProgressCallback } from "@/types/export.types";

/**
 * Raw format exporter - separates image and annotations into separate files
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
    const timestamp = this.getTimestamp();
    const imageFileName = `${fileName}_${timestamp}.jpg`;

    if (!annotations) {
      annotations = [];
    }

    // Upload image
    const imageMetadata: StorageFileMetadata = includeMetadata
      ? {
          name: imageFileName,
          mimeType: "image/jpeg",
          metadata: {
            app: "picto360",
            annotationCount: annotations.length.toString(),
            exportDate: timestamp,
            imageType: "360degree",
          },
        }
      : {
          name: imageFileName,
          mimeType: "image/jpeg",
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

    const annotationFileName = `${fileName}_annotations_${timestamp}.json`;
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
