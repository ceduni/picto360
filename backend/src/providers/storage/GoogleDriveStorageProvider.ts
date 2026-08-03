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

    // Starting upload with file info
    const fileMetadata = {
      name: metadata.name,
      parents: [folderId],
      properties: metadata.metadata,
    };

    const fileSize = fileBuffer.length;
    let uploadedBytes = 0;
    const CHUNK_SIZE = 64 * 1024; // 64KB chunks

    try {
      // Creating readable stream from buffer chunks
      // Generator function yields buffer chunks
      const chunkGenerator = function* () {
        let offset = 0;

        while (offset < fileBuffer.length) {
          const chunk = fileBuffer.slice(
            offset,
            Math.min(offset + CHUNK_SIZE, fileBuffer.length)
          );

          yield chunk;
          offset += CHUNK_SIZE;
        }
      };

      // Creating Readable stream from generator
      const readableStream = Readable.from(chunkGenerator());

      // Track data as it flows through stream
      // Each time a chunk is read by the providor API, we update the percentage and an SSE is sent
      readableStream.on("data", (chunk: Buffer) => {
        uploadedBytes += chunk.length;
        const percent = ((uploadedBytes / fileSize) * 100).toFixed(2);

        if (onProgress) {
          onProgress("upload-progress", {
            file: metadata.name,
            uploaded: uploadedBytes,
            total: fileSize,
            percent,
          });
        }
      });

      readableStream.on("error", (err) => {
        throw(`An Error occured during the upload, please try again:` + err)
      });

      // Sending stream to Google Drive APIs;

      // Pass stream to API - no race condition because generator is lazy
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


      if (onProgress) {
        onProgress("upload-complete", { fileId: response.data.id });
      }

      return {
        id: response.data.id!,
        name: response.data.name!,
      };
    } catch (error) {
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
