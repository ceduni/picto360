import { HotspotData } from "@/types/export.types";
import { ExportOptions, ExportResult } from "@/types/export.types";
import { IStorageProvider } from "@/providers/storage/IStorageProvider";
import { UploadProgressCallback } from "@/types/export.types";

/**
 * Export formatter interface
 * Different implementations for different export formats (raw, picto, etc.)
 */
export interface IExportFormatter {
  /**
   * Export in this format and upload to storage
   */
  export(
    fileBuffer: Buffer,
    annotations: HotspotData[] | undefined,
    options: ExportOptions,
    storage: IStorageProvider,
    folderId: string,
    onProgress?: UploadProgressCallback,
  ): Promise<Partial<ExportResult>>;
}

/**
 * Base class for export formatters
 */
export abstract class BaseExportFormatter implements IExportFormatter {
  protected getTimestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, "-");
  }

  abstract export(
    fileBuffer: Buffer,
    annotations: HotspotData[] | undefined,
    options: ExportOptions,
    storage: IStorageProvider,
    folderId: string,
    onProgress?: UploadProgressCallback,
  ): Promise<Partial<ExportResult>>;
}
