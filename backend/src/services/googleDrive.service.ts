import process from "process";
import dotenv from "dotenv";
dotenv.config();

import { google, drive_v3 } from "googleapis";

import { OAuth2Client } from "google-auth-library";
import { FastifyRequest } from "fastify";

export interface HotspotData {
  id: string;
  pitch: number;
  yaw: number;
  type: string;
  content?: string;
  url_text?: string;
  sceneId?: string;
  cssClass?: string;
  meta?: Record<string, any>; // optional metadata for custom cases
}

type AuthStatus = {
  isAuthenticated: boolean;
  provider: 'google' | null;
  scopes?: string[];
  connectedAt?: string; // ISO
  reason?: 'revoked' | 'expired' | 'manual_disconnect' | 'login' | 'refresh';
};

interface GoogleDriveConfig {
  clientId: string ;
  clientSecret: string;
  redirectUri:string;
}


class GoogleDriveBackendService {
  private config: GoogleDriveConfig;
  private oauth2Client:OAuth2Client;

  constructor() {
    this.config = {
      clientId: process.env.GOOGLE_CLIENT_ID || '' ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      redirectUri: process.env.GOOGLE_REDIRECT_URI || '',
    };
    if (!this.config.clientId || !this.config.clientSecret || !this.config.redirectUri) {
      throw new Error("GoogleDriveBackendService: Missing OAuth2 configuration");
    }
    this.oauth2Client = new google.auth.OAuth2(
      this.config.clientId,
      this.config.clientSecret,
      this.config.redirectUri,
    );
  }

  // Generate OAuth URL for frontend
  generateAuthUrl( state : string): string {

    const scopes = [
      'https://www.googleapis.com/auth/drive.file'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
      state,
    });
  }

  // Exchange authorization code for tokens
  async getTokensFromCode(code: string) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokens);
      return tokens;
    } catch (error) {
      throw new Error(`Failed to exchange code for tokens: ${error}`);
    }
  }

  // Set access token for requests
  setAccessToken(accessToken: string) {
    this.oauth2Client.setCredentials({ access_token: accessToken });
  }

  async revokeGoogleToken(token: string) {
    try{
      const res = await fetch("https://oauth2.googleapis.com/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ token }),
      });
    }catch(err){
      throw new Error(`Failes to revoke Token ${err}`)
    }

  }

  // Create folder in Google Drive
  async createFolder(name: string, parentId?: string): Promise<string> {
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });

    const folderMetadata = {
      name: name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentId ? [parentId] : undefined
    };

    try {
      const response = await drive.files.create({
        requestBody: folderMetadata,
        fields: 'id'
      });

      return response.data.id!;
    } catch (error) {
      throw new Error(`Failed to create folder: ${error}`);
    }
  }

  // Upload file to Google Drive
  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
    folderId: string,
    metadata?: Record<string, string>
  ): Promise<{ id: string; name: string }> {
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });

    const fileMetadata = {
      name: fileName,
      parents: [folderId],
      properties: metadata
    };

    try {
      const response = await drive.files.create({
        requestBody: fileMetadata,
        media: {
          mimeType: mimeType,
          body: require('stream').Readable.from(fileBuffer)
        },
        fields: 'id,name'
      });

      return {
        id: response.data.id!,
        name: response.data.name!
      };
    } catch (error) {
      throw new Error(`Failed to upload file: ${error}`);
    }
  }

  async ensureAccessToken(req: FastifyRequest) {
    const g = req.session.google;
    if (!g) throw new Error("Not authenticated with Google");

    // still valid?
    if (g.access_token && g.expiry && Date.now() < g.expiry - 10_000) return g.access_token;

    if (!g.refresh_token) throw new Error("No refresh token on session");

    const oauth = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!);
    oauth.setCredentials({ refresh_token: g.refresh_token });

    const { credentials } = await oauth.refreshAccessToken();
    req.session.google = {
      ...g,
      access_token: credentials.access_token!,
      expiry: credentials.expiry_date!,
    };
    await req.session.save?.();
    this.broadcast('auth-status', { connected: true, expiresAt: req.session.google.expiry });
    return req.session.google.access_token!;
  }

  async getAuthStatus (req:FastifyRequest){
    try{
      await this.ensureAccessToken(req);
      return {
          isAuthenticated: true,
          provider: 'google',
          scopes: ['https://www.googleapis.com/auth/drive.file'],
      }
    }catch(error){
      this.broadcast('auth-status', { connected: false, reason: 'revoked' });
      return {
          isAuthenticated: false,
          provider: 'google',
          scopes: ['https://www.googleapis.com/auth/drive.file'],
      }
    }

  }

  // Main export function
  async exportToGoogleDrive(
    fileBuffer: Buffer,
    annotations: HotspotData[]|undefined,
    options: {
      format: "raw" | "picto" ;
      fileName?: string;
      folderName?: string;
      includeMetadata?: boolean;
    }
  ) {
    const {
      fileName = 'annotated_360_image',
      folderName = '360° Image Annotations',
      includeMetadata = true
    } = options;

    try {
      
      // Create export folder
      const folderId = await this.createFolder(folderName);

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

      let imageFileName = "Untitled";
      let imageMetadata :Record<string,string> | undefined

      type Result = { id: string; name: string } | undefined;
      let annotationResult: Result = undefined;
      let imageResult: Result = undefined;
      let fileResult: Result = undefined;

      switch(options.format){
        //------------------- Raw Format (separated images)----------------------//  

        case "raw":
          imageFileName = `${fileName}_${timestamp}.jpg`;

          if(!annotations) annotations = [];
          
          imageMetadata  = includeMetadata ? {
            app: 'picto360',
            annotationCount: annotations.length.toString(),
            exportDate: timestamp,
            imageType: '360degree'
          } : { app: 'picto360' };

          imageResult = await this.uploadFile(
            fileBuffer,
            imageFileName,
            'image/jpeg',
            folderId,
            imageMetadata
          );

          // Upload annotations
          const annotationData = {
            version: '1.0',
            imageFileId: imageResult.id,
            exportDate: new Date().toISOString(),
            annotations: annotations,
            metadata: {
              totalAnnotations: annotations?.length,
              annotationTypes: [...new Set(annotations?.map(a => a.type))]
            }
          };
          const annotationFileName = `${fileName}_annotations_${timestamp}.json`;
          const annotationBuffer = Buffer.from(JSON.stringify(annotationData, null, 2));

          annotationResult = await this.uploadFile(
            annotationBuffer,
            annotationFileName,
            'application/json',
            folderId,
            {
              app: 'picto360',
              dataType: 'annotations',
              relatedImageId: imageResult.id
            }
          );                    
          break;
        //------------------- Picto Format ----------------------//  
        case "picto":
        default:
          imageFileName = `${fileName}_${timestamp}.picto`;

          fileResult = await this.uploadFile(
            fileBuffer,
            imageFileName,
            'application/picto',
            folderId,
          );

      }

      return {
        success: true,
        folderId,
        imageFile: fileResult || imageResult,
        annotationFile: annotationResult,
        driveUrl: `https://drive.google.com/drive/folders/${folderId}`
      };

    } catch (error) {
      console.error('Export failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Simple in-memory SSE client registry
  public clients = new Set<{ id: string; write: (data: string) => void }>();
  broadcast = (event: string, data: unknown) => {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    this.clients.forEach(c => c.write(payload));
  };    
}

let driveService : GoogleDriveBackendService|null = null;
export const getGoogleDriveService = () =>{
  if(driveService === null || driveService === undefined){
    driveService = new GoogleDriveBackendService();
    return driveService;
  }
  return driveService;
}

