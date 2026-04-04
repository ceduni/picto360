import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { Readable } from "stream";
import { BaseStorageProvider, StorageFileMetadata } from "./IStorageProvider";
import { UploadProgressCallback } from "@/types/export.types";

/**
 * Google Drive storage provider implementation
 */
export class GoogleDriveStorageProvider extends BaseStorageProvider {
  private oauth2Client: OAuth2Client;

  constructor(oauth2Client: OAuth2Client) {
    super();
    this.oauth2Client = oauth2Client;
  }

  async createFolder(name: string, parentId?: string): Promise<string> {
    const drive = google.drive({ version: "v3", auth: this.oauth2Client });

    const folderMetadata = {
      name: name,
      mimeType: "application/vnd.google-apps.folder",
      parents: parentId ? [parentId] : undefined,
    };

    try {
      const response = await drive.files.create({
        requestBody: folderMetadata,
        fields: "id",
      });

      return response.data.id!;
    } catch (error) {
      throw new Error(`GoogleDrive: Failed to create folder: ${error}`);
    }
  }

  async uploadFile(
    fileBuffer: Buffer,
    metadata: StorageFileMetadata,
    folderId: string,
    onProgress?: UploadProgressCallback,
  ): Promise<{ id: string; name: string }> {
    const drive = google.drive({ version: "v3", auth: this.oauth2Client });

    // ✅ LOG 1: Starting upload with file info
    console.log("📤 [UPLOAD START]", {
      fileName: metadata.name,
      fileSize: fileBuffer.length,
      mimeType: metadata.mimeType,
      timestamp: new Date().toISOString(),
    });

    const fileMetadata = {
      name: metadata.name,
      parents: [folderId],
      properties: metadata.metadata,
    };

    const fileSize = fileBuffer.length;
    let uploadedBytes = 0;
    const CHUNK_SIZE = 64 * 1024; // 64KB chunks

    try {
      // ✅ LOG 2: Creating readable stream from buffer chunks
      console.log("🔧 [STREAM SETUP]", {
        chunkSize: CHUNK_SIZE,
        totalChunks: Math.ceil(fileSize / CHUNK_SIZE),
        totalSize: fileSize,
      });

      // ✅ Generator function yields buffer chunks
      const chunkGenerator = function* () {
        let offset = 0;
        let chunkNumber = 0;

        while (offset < fileBuffer.length) {
          const chunk = fileBuffer.slice(
            offset,
            Math.min(offset + CHUNK_SIZE, fileBuffer.length)
          );

          // ✅ LOG 3: Each chunk being yielded
          console.log(`📦 [CHUNK ${chunkNumber}]`, {
            offset,
            chunkSize: chunk.length,
            progress: `${((offset + chunk.length) / fileSize * 100).toFixed(1)}%`,
          });

          yield chunk;
          offset += CHUNK_SIZE;
          chunkNumber++;
        }
      };

      // ✅ LOG 4: Creating Readable stream from generator
      console.log("🌊 [READABLE STREAM] Creating from generator");
      const readableStream = Readable.from(chunkGenerator());

      // ✅ LOG 5: Track data as it flows through stream
      readableStream.on("data", (chunk: Buffer) => {
        uploadedBytes += chunk.length;
        const percent = ((uploadedBytes / fileSize) * 100).toFixed(2);

        console.log(`📊 [DATA EVENT] Chunk read by API`, {
          bytesRead: chunk.length,
          totalUploaded: uploadedBytes,
          progress: `${percent}%`,
        });

        if (onProgress) {
          onProgress("upload-progress", {
            file: metadata.name,
            uploaded: uploadedBytes,
            total: fileSize,
            percent,
          });
        }
      });

      // ✅ LOG 6: Stream events
      readableStream.on("end", () => {
        console.log("✅ [STREAM END] All data has been read");
      });

      readableStream.on("error", (err) => {
        console.error("❌ [STREAM ERROR]", err);
      });

      // ✅ LOG 7: Before API call
      console.log("🚀 [API CALL] Sending to Google Drive API");
      const startTime = Date.now();

      // ✅ Pass stream to API - no race condition because generator is lazy
      const response = await drive.files.create(
        {
          requestBody: fileMetadata,
          media: {
            mimeType: metadata.mimeType,
            body: readableStream,
          },
          fields: "id,name",
        },
        {
          params: { uploadType: "resumable", chunksize: 256 * 1024 },
        },
      );

      const uploadTime = Date.now() - startTime;

      // ✅ LOG 8: Success response
      console.log("✨ [UPLOAD SUCCESS]", {
        fileId: response.data.id,
        fileName: response.data.name,
        uploadTimeMs: uploadTime,
        finalSize: uploadedBytes,
        expectedSize: fileSize,
        sizeMatch: uploadedBytes === fileSize,
      });

      if (onProgress) {
        onProgress("upload-complete", { fileId: response.data.id });
      }

      return {
        id: response.data.id!,
        name: response.data.name!,
      };
    } catch (error) {
      // ✅ LOG 9: Detailed error logging
      console.error("❌ [UPLOAD FAILED]", {
        fileName: metadata.name,
        fileSize,
        uploadedBytes,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      throw new Error(`GoogleDrive: Failed to upload file: ${error}`);
    }
  }

  async deleteFile(fileId: string): Promise<void> {
    const drive = google.drive({ version: "v3", auth: this.oauth2Client });

    try {
      await drive.files.delete({
        fileId: fileId,
      });
    } catch (error) {
      throw new Error(`GoogleDrive: Failed to delete file: ${error}`);
    }
  }

  async getFileInfo(fileId: string): Promise<{ id: string; name: string }> {
    const drive = google.drive({ version: "v3", auth: this.oauth2Client });

    try {
      const response = await drive.files.get({
        fileId: fileId,
        fields: "id,name",
      });

      return {
        id: response.data.id!,
        name: response.data.name!,
      };
    } catch (error) {
      throw new Error(`GoogleDrive: Failed to get file info: ${error}`);
    }
  }

  async getFolderShareUrl(folderId: string): Promise<string> {
    return `https://drive.google.com/drive/folders/${folderId}`;
  }
}
