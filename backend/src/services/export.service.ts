import { FastifyReply, FastifyRequest } from "fastify";
import { ExportFormat, ExportInput, HotspotData } from "@/types/export.types";
import { AuthService, getAuthService } from "./auth.service";
import { getNotificationHubService } from "./notificationHub.service";
import { GoogleDriveStorageProvider } from "@/providers/storage/GoogleDriveStorageProvider";
import { ExportFormatterFactory } from "@/providers/export/ExportFormatterFactory";
import { google } from "googleapis";
import { AuthProviderFactory } from "@/providers/auth/AuthProviderFactory";
import "@/config/env"; // Ensure environment variables are loaded

/**
 * Export service - handles file export to cloud storage
 * Decoupled from auth - works with any auth provider
 * Uses pluggable formatters and storage providers
 */
export class ExportService {
  private authService: AuthService;
  private notificationHub: ReturnType<typeof getNotificationHubService>;

  constructor(authService : AuthService,
              notificationHub : ReturnType<typeof getNotificationHubService>,
              _authProviderFactory? : AuthProviderFactory
            ){
    this.authService = authService;
    this.notificationHub = notificationHub;
  }

  async buildExportOptions (request: FastifyRequest, reply: FastifyReply):Promise<ExportInput>{
    const formFields: Record<string, string> = {};
    let fileBuffer: Buffer | null = null;
    let fileMimeType: string | undefined = undefined;

    // Iterate through ALL multipart parts
    const parts = request.parts();
    for await (const part of parts) {
      if (part.type === 'file') {
        // Handle file part
        fileBuffer = await part.toBuffer();
        fileMimeType = part.mimetype;
      } else if (part.type === 'field') {
        // Handle text field parts
        formFields[part.fieldname] = part.value as string;
      }
    }

    if (!fileBuffer || fileBuffer.length === 0) {
      return reply.status(400).send({ error: 'Image or picto file required' });
    }

    const format = formFields.format as ExportFormat || 'picto';
    let annotations: HotspotData[] | undefined = undefined;

    if (format === "raw" && formFields.annotations) {
      try {
        annotations = JSON.parse(formFields.annotations);
      } catch {
        return reply.status(400).send('Error: Invalid annotations JSON');
      }
    }
    const options = {
      format,
      fileName: formFields.fileName || undefined,
      folderName: formFields.folderName || undefined,
      includeMetadata: formFields.includeMetadata === 'true',
      mimeType: fileMimeType
    }

    return {
      fileBuffer,
      annotations,
      options,
    }
  }

  /**
   * Export file to Google Drive
   * Handles auth, storage provider setup, and format selection
   */
  async exportToGoogleDrive(request: FastifyRequest, reply: FastifyReply){
    try {
      const export_input :ExportInput= await this.buildExportOptions(request,reply);

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
      const storage = new GoogleDriveStorageProvider(oauth2Client);

      // Create export folder
      const folderName = export_input.options.folderName || "360° Image Annotations";
      const folderId = await storage.createFolder(folderName);

      // Notify client: folder created
      this.notificationHub.emit(scope, "export-status", {
        status: "folder_created",
        folderId,
        folderName,
      });

      // Get formatter and export
      const format = export_input.options.format;
      const formatter = ExportFormatterFactory.getFormatter(format);
      const exportResult = await formatter.export(
        export_input.fileBuffer,
        export_input.annotations,
        export_input.options,
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

      reply.status(500).send({
        error: error instanceof Error ? error.message : 'Export failed'
      });
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
