import { BaseExportFormatter } from "./IExportFormatter";
import { HotspotData, ExportOptions, ExportResult } from "@/types/export.types";
import { IStorageProvider } from "@/providers/storage/IStorageProvider";
import { UploadProgressCallback } from "@/types/export.types";

/**
 * Picto format exporter - custom binary/compressed format
 * Image and annotations combined in single file
 */
export class PictoFormatExporter extends BaseExportFormatter {
  async export(
    fileBuffer: Buffer,
    annotations: HotspotData[] | undefined,
    options: ExportOptions,
    storage: IStorageProvider,
    folderId: string,
    onProgress?: UploadProgressCallback,
  ): Promise<Partial<ExportResult>> {
    const { fileName = "annotated_360_image" } = options;
    const timestamp = this.getTimestamp();
    const pictoFileName = `${fileName}_${timestamp}.picto`;

    // In a real implementation, you would:
    // 1. Encode the image and annotations into a custom binary format
    // 2. Potentially compress with gzip or brotli
    // 3. Create a structured format with headers, checksums, etc.

    // For now, we'll create a simple JSON-based container
    const pictoData = {
      version: "1.0",
      format: "picto",
      exportDate: new Date().toISOString(),
      image: {
        data: fileBuffer.toString("base64"),
        mimeType: "image/jpeg",
        size: fileBuffer.length,
      },
      annotations: annotations || [],
      metadata: {
        totalAnnotations: (annotations || []).length,
        annotationTypes: [...new Set((annotations || []).map((a) => a.type))],
      },
    };

    const pictoBuffer = Buffer.from(JSON.stringify(pictoData, null, 2));

    const fileMetadata = {
      name: pictoFileName,
      mimeType: "application/picto",
      metadata: {
        app: "picto360",
        format: "picto",
        annotationCount: (annotations || []).length.toString(),
      },
    };

    const fileResult = await storage.uploadFile(pictoBuffer, fileMetadata, folderId, onProgress);

    return {
      imageFile: fileResult,
    };
  }
}
