export interface HotspotData {
  id: string;
  pitch: number;
  yaw: number;
  type: string;
  content?: string;
  url_text?: string;
  sceneId?: string;
  cssClass?: string;
  meta?: Record<string, unknown>;
}

export type ExportFormat = "raw" | "picto";

export interface ExportOptions {
  format: ExportFormat;
  fileName?: string;
  folderName?: string;
  includeMetadata?: boolean;
}

export interface ExportedFile {
  id: string;
  name: string;
}

export interface ExportResult {
  success: boolean;
  folderId?: string;
  imageFile?: ExportedFile;
  annotationFile?: ExportedFile;
  driveUrl?: string;
  error?: string;
}

export interface ExportInput {
  fileBuffer: Buffer;
  annotations?: HotspotData[];
  options: ExportOptions;
}

export interface UploadProgressEvent {
  file: string;
  uploaded: number;
  total: number;
  percent: string;
}

export type NotificationSink = (event: string, data: unknown) => void;

/**
 * Callback for progress updates during export
 * Receives event type and progress data
 * Events: "upload-progress" (intermediate), "upload-complete" (final)
 */
export type UploadProgressCallback = (event: string, data: UploadProgressEvent | Record<string, unknown>) => void;
