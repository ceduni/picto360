// import { google } from "googleapis";
// import { PassThrough } from "stream";

// import {
//   ExportOptions,
//   ExportResult,
//   HotspotData,
//   NotificationSink,
// } from "@/types/export.types";
// import { OAuthConnection } from "@/types/oauth.types";

// class GoogleDriveExportProvider {
//   async exportToGoogleDrive(
//     connection: OAuthConnection,
//     fileBuffer: Buffer,
//     annotations: HotspotData[] | undefined,
//     options: ExportOptions,
//     notify?: NotificationSink,
//   ): Promise<ExportResult> {
//     const {
//       fileName = "annotated_360_image",
//       folderName = "360 Image Annotations",
//       includeMetadata = true,
//     } = options;

//     const folderId = await this.createFolder(connection, folderName);
//     const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

//     let annotationFile;
//     let imageFile;

//     switch (options.format) {
//       case "raw": {
//         const safeAnnotations = annotations ?? [];
//         const imageMetadata: Record<string, string> = { app: "picto360" };

//         if (includeMetadata) {
//           imageMetadata.annotationCount = safeAnnotations.length.toString();
//           imageMetadata.exportDate = timestamp;
//           imageMetadata.imageType = "360degree";
//         }

//         imageFile = await this.uploadFile(
//           connection,
//           fileBuffer,
//           `${fileName}_${timestamp}.jpg`,
//           "image/jpeg",
//           folderId,
//           imageMetadata,
//           notify,
//         );

//         const annotationData = {
//           version: "1.0",
//           imageFileId: imageFile.id,
//           exportDate: new Date().toISOString(),
//           annotations: safeAnnotations,
//           metadata: {
//             totalAnnotations: safeAnnotations.length,
//             annotationTypes: [...new Set(safeAnnotations.map((annotation) => annotation.type))],
//           },
//         };

//         annotationFile = await this.uploadFile(
//           connection,
//           Buffer.from(JSON.stringify(annotationData, null, 2)),
//           `${fileName}_annotations_${timestamp}.json`,
//           "application/json",
//           folderId,
//           {
//             app: "picto360",
//             dataType: "annotations",
//             relatedImageId: imageFile.id,
//           },
//           notify,
//         );
//         break;
//       }
//       case "picto":
//       default:
//         imageFile = await this.uploadFile(
//           connection,
//           fileBuffer,
//           `${fileName}_${timestamp}.picto`,
//           "application/picto",
//           folderId,
//           undefined,
//           notify,
//         );
//         break;
//     }

//     notify?.("export-complete", { folderId, imageFileId: imageFile.id });
//     notify?.("upload-complete", { folderId, imageFileId: imageFile.id });

//     return {
//       success: true,
//       folderId,
//       imageFile,
//       annotationFile,
//       driveUrl: `https://drive.google.com/drive/folders/${folderId}`,
//     };
//   }

//   private async createFolder(connection: OAuthConnection, name: string, parentId?: string) {
//     const drive = this.createDriveClient(connection);
//     const response = await drive.files.create({
//       requestBody: {
//         name,
//         mimeType: "application/vnd.google-apps.folder",
//         parents: parentId ? [parentId] : undefined,
//       },
//       fields: "id",
//     });

//     if (!response.data.id) {
//       throw new Error("Google Drive did not return a folder id");
//     }

//     return response.data.id;
//   }

//   private async uploadFile(
//     connection: OAuthConnection,
//     fileBuffer: Buffer,
//     fileName: string,
//     mimeType: string,
//     folderId: string,
//     metadata?: Record<string, string>,
//     notify?: NotificationSink,
//   ) {
//     const drive = this.createDriveClient(connection);
//     const fileSize = fileBuffer.length;
//     const chunkSize = 64 * 1024;
//     const progressStream = new PassThrough({ highWaterMark: chunkSize });

//     let uploadedBytes = 0;

//     progressStream.on("data", (chunk: Buffer) => {
//       uploadedBytes += chunk.length;
//       notify?.("upload-progress", {
//         file: fileName,
//         uploaded: uploadedBytes,
//         total: fileSize,
//         percent: ((uploadedBytes / fileSize) * 100).toFixed(2),
//       });
//     });

//     let offset = 0;
//     while (offset < fileBuffer.length) {
//       const chunk = fileBuffer.slice(offset, offset + chunkSize);
//       progressStream.write(chunk);
//       offset += chunkSize;
//     }
//     progressStream.end();

//     const response = await drive.files.create(
//       {
//         requestBody: {
//           name: fileName,
//           parents: [folderId],
//           properties: metadata,
//         },
//         media: {
//           mimeType,
//           body: progressStream,
//         },
//         fields: "id,name",
//       },
//       {
//         params: { uploadType: "resumable", chunksize: 256 * 1024 },
//       },
//     );

//     if (!response.data.id || !response.data.name) {
//       throw new Error(`Google Drive did not return file metadata for ${fileName}`);
//     }

//     return {
//       id: response.data.id,
//       name: response.data.name,
//     };
//   }

//   private createDriveClient(connection: OAuthConnection) {
//     const oauthProvider = getGoogleDriveOauthProvider();
//     const auth = oauthProvider.createAuthorizedClient(connection.accessToken);
//     return google.drive({ version: "v3", auth });
//   }
// }

// let googleDriveExportProvider: GoogleDriveExportProvider | null = null;

// export const getGoogleDriveExportProvider = () => {
//   if (!googleDriveExportProvider) {
//     googleDriveExportProvider = new GoogleDriveExportProvider();
//   }

//   return googleDriveExportProvider;
// };
