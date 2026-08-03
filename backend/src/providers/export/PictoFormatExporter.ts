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

    if (!this.isPictoFile(fileBuffer)) {
      throw new Error("Invalid .picto file");
    }

    const fileMetadata = {
      name: pictoFileName,
      mimeType: "application/picto",
    };

    const fileResult = await storage.uploadFile(fileBuffer, fileMetadata, folderId, onProgress);

    return {
      imageFile: fileResult,
    };
  }

  private isPictoFile(fileBuffer: Buffer): boolean {
    if (fileBuffer.length < 22 || fileBuffer.readUInt32LE(0) !== 0x04034b50) {
      return false;
    }

    const endOfCentralDirectoryOffset = this.findEndOfCentralDirectory(fileBuffer);
    if (endOfCentralDirectoryOffset === -1) {
      return false;
    }

    const centralDirectorySize = fileBuffer.readUInt32LE(endOfCentralDirectoryOffset + 12);
    const centralDirectoryOffset = fileBuffer.readUInt32LE(endOfCentralDirectoryOffset + 16);
    const centralDirectoryEnd = centralDirectoryOffset + centralDirectorySize;

    if (centralDirectoryEnd > fileBuffer.length) {
      return false;
    }

    const requiredFiles = new Set(["metadata.json", "annotations.json", "manifest.json"]);
    let offset = centralDirectoryOffset;

    while (offset + 46 <= centralDirectoryEnd && requiredFiles.size > 0) {
      if (fileBuffer.readUInt32LE(offset) !== 0x02014b50) {
        return false;
      }

      const fileNameLength = fileBuffer.readUInt16LE(offset + 28);
      const extraFieldLength = fileBuffer.readUInt16LE(offset + 30);
      const fileCommentLength = fileBuffer.readUInt16LE(offset + 32);
      const fileNameStart = offset + 46;
      const fileNameEnd = fileNameStart + fileNameLength;

      if (fileNameEnd > centralDirectoryEnd) {
        return false;
      }

      requiredFiles.delete(fileBuffer.toString("utf8", fileNameStart, fileNameEnd));
      offset = fileNameEnd + extraFieldLength + fileCommentLength;
    }

    return requiredFiles.size === 0;
  }

  private findEndOfCentralDirectory(fileBuffer: Buffer): number {
    const minimumEndOfCentralDirectorySize = 22;
    const maximumCommentLength = 0xffff;
    const searchStart = Math.max(
      0,
      fileBuffer.length - minimumEndOfCentralDirectorySize - maximumCommentLength,
    );

    for (let offset = fileBuffer.length - minimumEndOfCentralDirectorySize; offset >= searchStart; offset--) {
      if (fileBuffer.readUInt32LE(offset) === 0x06054b50) {
        return offset;
      }
    }

    return -1;
  }
}
