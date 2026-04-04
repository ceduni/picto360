import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { PassThrough } from "stream";
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

    const fileMetadata = {
      name: metadata.name,
      parents: [folderId],
      properties: metadata.metadata,
    };

    const fileSize = fileBuffer.length;
    let uploadedBytes = 0;
    const CHUNK_SIZE = 64 * 1024; // 64KB chunks

    // Create progress stream
    const progressStream = new PassThrough({ highWaterMark: CHUNK_SIZE });

    progressStream.on("data", (chunk: Buffer) => {
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

    try {
      // Write buffer in chunks
      let offset = 0;
      while (offset < fileBuffer.length) {
        const chunk = fileBuffer.slice(offset, offset + CHUNK_SIZE);
        progressStream.write(chunk);
        offset += CHUNK_SIZE;
      }
      progressStream.end();

      const response = await drive.files.create(
        {
          requestBody: fileMetadata,
          media: {
            mimeType: metadata.mimeType,
            body: progressStream,
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
