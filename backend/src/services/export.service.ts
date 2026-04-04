import { FastifyRequest } from "fastify";
import { ExportInput, ExportResult } from "@/types/export.types";
import { AuthService, getAuthService } from "./auth.service";
import { getNotificationHubService } from "./notificationHub.service";
import { GoogleDriveStorageProvider } from "@/providers/storage/GoogleDriveStorageProvider";
import { ExportFormatterFactory } from "@/providers/export/ExportFormatterFactory";
import { google } from "googleapis";
import { auth } from "firebase-admin";
import { AuthProviderFactory } from "@/providers/auth/AuthProviderFactory";
import "@/config/env"; // Ensure environment variables are loaded

/**
 * Export service - handles file export to cloud storage
 * Decoupled from auth - works with any auth provider
 * Uses pluggable formatters and storage providers
 */
export class ExportService {
  private authService = getAuthService("google");
  private notificationHub = getNotificationHubService();
  private googleStorageProvider : GoogleDriveStorageProvider | undefined = undefined;

  constructor(authService : AuthService,
              notificationHub : ReturnType<typeof getNotificationHubService>,
              googleStorageProvider? : GoogleDriveStorageProvider,
              authProviderFactory? : AuthProviderFactory
            ){
    this.authService = authService;
    this.notificationHub = notificationHub;
    if (googleStorageProvider) {
      this.googleStorageProvider = googleStorageProvider;
    }
  }

  /**
   * Export file to Google Drive
   * Handles auth, storage provider setup, and format selection
   */
  async exportToGoogleDrive(request: FastifyRequest, input: ExportInput): Promise<ExportResult> {
    try {
      // Ensure valid auth and get access token
      const accessToken = await this.authService.ensureConnection(request);
      const scope = this.authService.getSessionScope(request);

      // Create OAuth client with current access token
      // Note: Using environment variables ensures we're using the same credentials
      // that were used for authentication

      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI,
      );
      oauth2Client.setCredentials({ access_token: accessToken });

      // Create storage provider
      if (!this.googleStorageProvider) {
        this.googleStorageProvider = new GoogleDriveStorageProvider(oauth2Client);
      }
      const storage = this.googleStorageProvider;

      // Create export folder
      const folderName = input.options.folderName || "360° Image Annotations";
      const folderId = await storage.createFolder(folderName);

      // Notify client: folder created
      this.notificationHub.emit(scope, "export-status", {
        status: "folder_created",
        folderId,
        folderName,
      });

      // Get formatter and export
      const format = input.options.format || "picto";
      const formatter = ExportFormatterFactory.getFormatter(format);
      const exportResult = await formatter.export(
        input.fileBuffer,
        input.annotations,
        input.options,
        storage,
        folderId,
        (event, data) => {
          // Relay upload progress to client
          this.notificationHub.emit(scope, event, data);
        },
      );

      // Build final result
      const driveUrl = await storage.getFolderShareUrl(folderId);

      return {
        success: true,
        folderId,
        imageFile: exportResult.imageFile,
        annotationFile: exportResult.annotationFile,
        driveUrl,
      };
    } catch (error) {
      this.notificationHub.emit(
        this.authService.getSessionScope(request),
        "export-error",
        {
          error: error instanceof Error ? error.message : "Unknown error",
        },
      );

      return {
        success: false,
        error: error instanceof Error ? error.message : "Export failed",
      };
    }
  }
}

// Singleton
let exportService: ExportService | null = null;

export function getExportService(): ExportService {
  if (!exportService) {
    exportService = new ExportService(getAuthService("google"), getNotificationHubService());
  }
  return exportService;
}
