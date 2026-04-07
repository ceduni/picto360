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
    const pictoFileName = `${fileName}.picto`;

    // the compression service is in the front-end
    type Result = { id: string; name: string } | undefined;
    let annotationResult: Result = undefined;

    const fileMetadata = {
      name: pictoFileName,
      mimeType: "application/picto",
    };

    const fileResult = await storage.uploadFile(fileBuffer, fileMetadata, folderId, onProgress);

    return {
      imageFile: fileResult,
    };
  }
}
