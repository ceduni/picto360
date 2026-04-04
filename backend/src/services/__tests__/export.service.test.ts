/**
 * Export Service Tests
 * Test the export orchestration: auth validation → folder creation → format selection → upload
 */

import { describe, it, expect, beforeEach, jest, afterEach } from "@jest/globals";
import { ExportService } from "@/services/export.service";
import { AuthService } from "@/services/auth.service";
import { GoogleDriveStorageProvider } from "@/providers/storage/GoogleDriveStorageProvider";
import { ExportFormatterFactory } from "@/providers/export/ExportFormatterFactory";
import { getNotificationHubService } from "@/services/notificationHub.service";
import { FastifyRequest } from "fastify";
import { HotspotData, } from "@/types/export.types";

// Mock dependencies
jest.mock("@/services/auth.service");
jest.mock("@/providers/storage/GoogleDriveStorageProvider");
jest.mock("@/services/notificationHub.service");

describe("ExportService", () => {
  let exportService: ExportService;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockStorageProvider: jest.Mocked<GoogleDriveStorageProvider>;
  let mockNotificationHub: jest.Mocked<ReturnType<typeof getNotificationHubService>>;
  let mockRequest: jest.Mocked<FastifyRequest>;

  const mockFileBuffer = Buffer.from("fake image data");
  const mockAnnotations: HotspotData[] = [
    {
      id: "hotspot-1",
      pitch: 45,
      yaw: 90,
      type: "link",
      content: "Test hotspot",
    },
  ];

  beforeEach(() => {
    // Setup mocks
    mockAuthService = {
      ensureConnection: jest.fn<() => Promise<string>>().mockResolvedValue("mock-access-token"),
      getSessionScope: jest.fn<() => string>().mockReturnValue("session-scope-123"),
    } as unknown as jest.Mocked<AuthService>;

    mockStorageProvider = {
      createFolder: jest.fn<() => Promise<string>>().mockResolvedValue("folder-id-123"),
      uploadFile: jest.fn<() => Promise<{ id: string; name: string }>>().mockResolvedValue({
        id: "file-id-123",
        name: "test-file.jpg",
      }),
      getFolderShareUrl: jest.fn<() => Promise<string>>().mockResolvedValue("https://drive.google.com/drive/folders/folder-id-123"),
    } as unknown as jest.Mocked<GoogleDriveStorageProvider>;

    mockNotificationHub = {
      emit: jest.fn(),
    } as unknown as jest.Mocked<ReturnType<typeof getNotificationHubService>>;

    mockRequest = {
      session: {
        google: {
          access_token: "mock-token",
          refresh_token: "mock-refresh",
          expiry: Date.now() + 3600000,
        },
      },
    } as unknown as jest.Mocked<FastifyRequest>;

    exportService = new ExportService(mockAuthService, mockNotificationHub, mockStorageProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("exportToGoogleDrive", () => {

    it("should export successfully in picto format", async () => {
      const result = await exportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: mockAnnotations,
        options: {
          format: "picto",
          fileName: "test-image.jpg",
          folderName: "360° Image Annotations",
        },
      });

      expect(result.success).toBe(true);
      expect(mockStorageProvider.createFolder).toHaveBeenCalledWith("360° Image Annotations");
      expect(result.folderId).toBe("folder-id-123");
      expect(mockNotificationHub.emit).toHaveBeenCalledWith(
        "session-scope-123",
        "export-status",
        expect.objectContaining({ status: "folder_created" })
      );
    });

    it("should export successfully in raw format", async () => {
      const result = await exportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: mockAnnotations,
        options: {
          format: "raw",
          fileName: "test-image.jpg",
          folderName: "360° Image Annotations",
        },
      });

      expect(result.success).toBe(true);
      expect(result.folderId).toBe("folder-id-123");
    });

    it("should ensure valid access token before export", async () => {
      await exportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: mockAnnotations,
        options: { format: "picto" },
      });

      expect(mockAuthService.ensureConnection).toHaveBeenCalledWith(mockRequest);
    });

    it("should get folder share URL after upload", async () => {
      const result = await exportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: mockAnnotations,
        options: { format: "picto" },
      });

      expect(result.driveUrl).toContain("drive.google.com");
      expect(mockStorageProvider.getFolderShareUrl).toHaveBeenCalledWith("folder-id-123");
    });

    it("should handle auth failure gracefully", async () => {
      mockAuthService.ensureConnection = jest.fn<() => Promise<string>>().mockRejectedValue(new Error("Not authenticated"));

      const result = await exportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: mockAnnotations,
        options: { format: "picto" },
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain("Not authenticated");
    });

    it("should handle folder creation failure", async () => {
      mockStorageProvider.createFolder = jest.fn<() => Promise<string>>().mockRejectedValue(new Error("Failed to create folder"));

      const result = await exportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: mockAnnotations,
        options: { format: "picto" },
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain("Failed to create folder");
    });

    it("should emit export-error notification on failure", async () => {
      mockStorageProvider.createFolder = jest.fn<() => Promise<string>>().mockRejectedValue(new Error("Storage error"));

      await exportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: mockAnnotations,
        options: { format: "picto" },
      });

      expect(mockNotificationHub.emit).toHaveBeenCalledWith(
        "session-scope-123",
        "export-error",
        expect.any(Object)
      );
    });

    it("should use default folder name if not provided", async () => {
      await exportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: undefined,
        options: { format: "picto" },
      });

      expect(mockStorageProvider.createFolder).toHaveBeenCalledWith(expect.any(String));
    });

    it("should use default file name if not provided", async () => {
      await exportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: mockAnnotations,
        options: { format: "raw" },
      });

      expect(mockStorageProvider.uploadFile).toHaveBeenCalledWith(
        expect.any(Buffer),
        expect.objectContaining({ name: expect.any(String) }),
        "folder-id-123",
        expect.any(Function)
      );
    });
  });

  describe("Format Selection", () => {
    it("should select raw formatter for raw format", async () => {
      const spy = jest.spyOn(ExportFormatterFactory, "getFormatter");

      await exportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: mockAnnotations,
        options: { format: "raw" },
      });

      expect(spy).toHaveBeenCalledWith("raw");
    });

    it("should select picto formatter for picto format", async () => {
      const spy = jest.spyOn(ExportFormatterFactory, "getFormatter");

      await exportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: mockAnnotations,
        options: { format: "picto" },
      });

      expect(spy).toHaveBeenCalledWith("picto");
    });

    it("should default to picto formatter if format not specified", async () => {
      const spy = jest.spyOn(ExportFormatterFactory, "getFormatter");

      await exportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: mockAnnotations,
        options: {} as any,
      });

      expect(spy).toHaveBeenCalledWith("picto");
    });
  });

  describe("Progress Tracking", () => {
    it("should relay formatter progress events through notification hub", async () => {
      await exportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: mockAnnotations,
        options: { format: "raw" },
      });

      // The progress callback should be invoked
      expect(mockNotificationHub.emit).toHaveBeenCalledWith(
        "session-scope-123",
        expect.stringMatching(/upload-progress|upload-complete|export-status|export-error/),
        expect.any(Object)
      );
    });
  });

  describe("Session Isolation", () => {
    it("should emit notifications to correct session scope", async () => {
      mockAuthService.getSessionScope = jest.fn<() => string>().mockReturnValue("user-session-abc");

      await exportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: mockAnnotations,
        options: { format: "picto" },
      });

      // All notifications should be scoped to the user's session
      const calls = mockNotificationHub.emit.mock.calls;
      calls.forEach((call) => {
        expect(call[0]).toBe("user-session-abc");
      });
    });
  });
});
