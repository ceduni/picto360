export interface HotspotData {
  id: string;
  pitch: number;
  yaw: number;
  type: string;
  content?: string;
  url_text?: string;
  sceneId?: string;
  cssClass?: string;
  /** Video only: when the annotation is visible. */
  timeRange?: { start: number; end?: number };
  meta?: Record<string, unknown>;
}

export type ExportFormat = "raw" | "picto";

export interface ExportOptions {
  format: ExportFormat;
  fileName?: string;
  folderName?: string;
  includeMetadata?: boolean;
  /** MIME type of the uploaded media (image/jpeg, video/mp4, ...). */
  mimeType?: string;
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
