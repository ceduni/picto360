import { ExportResult, UploadProgressCallback } from "@/types/export.types";

/**
 * File metadata for storage
 */
export interface StorageFileMetadata {
  name: string;
  mimeType: string;
  metadata?: Record<string, string>;
}

/**
 * Folder creation result
 */
export interface StorageFolderResult {
  id: string;
  name: string;
}

/**
 * Storage provider interface
 * Abstracts away cloud storage details (Google Drive, OneDrive, S3, etc.)
 */
export interface IStorageProvider {
  /**
   * Create a folder in storage
   */
  createFolder(name: string, parentId?: string): Promise<string>;

  /**
   * Upload a file to storage
   */
  uploadFile(
    fileBuffer: Buffer,
    metadata: StorageFileMetadata,
    folderId: string,
    onProgress?: UploadProgressCallback,
  ): Promise<{ id: string; name: string }>;

  /**
   * Delete a file from storage
   */
  deleteFile(fileId: string): Promise<void>;

  /**
   * Get file info
   */
  getFileInfo(fileId: string): Promise<{ id: string; name: string }>;

  /**
   * Get folder share URL
   */
  getFolderShareUrl(folderId: string): Promise<string>;
}

/**
 * Abstract base class for storage providers
 */
export abstract class BaseStorageProvider implements IStorageProvider {
  abstract createFolder(name: string, parentId?: string): Promise<string>;
  abstract uploadFile(
    fileBuffer: Buffer,
    metadata: StorageFileMetadata,
    folderId: string,
    onProgress?: UploadProgressCallback,
  ): Promise<{ id: string; name: string }>;
  abstract deleteFile(fileId: string): Promise<void>;
  abstract getFileInfo(fileId: string): Promise<{ id: string; name: string }>;
  abstract getFolderShareUrl(folderId: string): Promise<string>;
}
