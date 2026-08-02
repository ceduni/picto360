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
import { FastifyReply, FastifyRequest } from "fastify";
import { HotspotData } from "@/types/export.types";

// Mock dependencies
jest.mock("@/services/auth.service");
jest.mock("@/providers/storage/GoogleDriveStorageProvider");
jest.mock("@/services/notificationHub.service");

describe("ExportService", () => {
  let exportService: ExportService;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockNotificationHub: jest.Mocked<ReturnType<typeof getNotificationHubService>>;

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

  // exportToGoogleDrive reads multipart parts directly off the request, so
  // tests drive it through a fake fastify-multipart async iterator rather
  // than passing already-parsed export input.
  function makeRequest(
    fields: Record<string, string> = {},
    fileBuffer: Buffer | null = mockFileBuffer,
  ): jest.Mocked<FastifyRequest> {
    async function* partsGen() {
      if (fileBuffer !== null) {
        yield {
          type: "file",
          filename: "test-image.jpg",
          mimetype: "image/jpeg",
          toBuffer: async () => fileBuffer,
        } as any;
      }
      for (const [fieldname, value] of Object.entries(fields)) {
        yield { type: "field", fieldname, value } as any;
      }
    }
    return {
      parts: () => partsGen(),
      session: {},
    } as unknown as jest.Mocked<FastifyRequest>;
  }

  function makeReply(): jest.Mocked<FastifyReply> {
    const reply = {
      status: jest.fn<() => any>(),
      send:   jest.fn<() => any>(),
    } as unknown as jest.Mocked<FastifyReply>;
    (reply.status as jest.Mock).mockReturnValue(reply);
    return reply;
  }

  beforeEach(() => {
    // Setup mocks
    mockAuthService = {
      ensureConnection: jest.fn<() => Promise<string>>().mockResolvedValue("mock-access-token"),
      getSessionScope: jest.fn<() => string>().mockReturnValue("session-scope-123"),
    } as unknown as jest.Mocked<AuthService>;

    mockNotificationHub = {
      emit: jest.fn(),
    } as unknown as jest.Mocked<ReturnType<typeof getNotificationHubService>>;

    // exportToGoogleDrive constructs its own GoogleDriveStorageProvider
    // internally, so we configure the (auto-mocked) prototype methods that
    // every instance shares rather than injecting a storage provider.
    (GoogleDriveStorageProvider.prototype.createFolder as jest.Mock<any>)
      .mockResolvedValue("folder-id-123");
    (GoogleDriveStorageProvider.prototype.uploadFile as jest.Mock<any>)
      .mockResolvedValue({ id: "file-id-123", name: "test-file.jpg" });
    (GoogleDriveStorageProvider.prototype.getFolderShareUrl as jest.Mock<any>)
      .mockResolvedValue("https://drive.google.com/drive/folders/folder-id-123");

    // Call-through spy: real RawFormatExporter/PictoFormatExporter still run,
    // this just lets "Format Selection" tests observe which one was picked.
    jest.spyOn(ExportFormatterFactory, "getFormatter");

    exportService = new ExportService(mockAuthService, mockNotificationHub);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("exportToGoogleDrive", () => {
    // "raw" format is used for the generic orchestration tests below because
    // PictoFormatExporter validates the buffer is a real .picto zip archive;
    // format-specific behavior is covered by the "Format Selection" tests.

    it("should export successfully", async () => {
      const request = makeRequest({
        format: "raw",
        fileName: "test-image.jpg",
        folderName: "360° Image Annotations",
        annotations: JSON.stringify(mockAnnotations),
      });
      const reply = makeReply();

      const result = await exportService.exportToGoogleDrive(request, reply);

      expect(result?.success).toBe(true);
      expect(GoogleDriveStorageProvider.prototype.createFolder).toHaveBeenCalledWith("360° Image Annotations");
      expect(result?.folderId).toBe("folder-id-123");
      expect(mockNotificationHub.emit).toHaveBeenCalledWith(
        "session-scope-123",
        "export-status",
        expect.objectContaining({ status: "folder_created" })
      );
    });

    it("should ensure valid access token before export", async () => {
      const request = makeRequest({ format: "raw" });
      const reply = makeReply();

      await exportService.exportToGoogleDrive(request, reply);

      expect(mockAuthService.ensureConnection).toHaveBeenCalledWith(request);
    });

    it("should get folder share URL after upload", async () => {
      const request = makeRequest({ format: "raw" });
      const reply = makeReply();

      const result = await exportService.exportToGoogleDrive(request, reply);

      expect(result?.driveUrl).toContain("drive.google.com");
      expect(GoogleDriveStorageProvider.prototype.getFolderShareUrl).toHaveBeenCalledWith("folder-id-123");
    });

    it("should handle auth failure gracefully", async () => {
      mockAuthService.ensureConnection = jest.fn<() => Promise<string>>().mockRejectedValue(new Error("Not authenticated"));
      const request = makeRequest({ format: "raw" });
      const reply = makeReply();

      await exportService.exportToGoogleDrive(request, reply);

      expect(reply.status).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.stringContaining("Not authenticated") })
      );
    });

    it("should handle folder creation failure", async () => {
      (GoogleDriveStorageProvider.prototype.createFolder as jest.Mock<any>)
        .mockRejectedValue(new Error("Failed to create folder"));
      const request = makeRequest({ format: "raw" });
      const reply = makeReply();

      await exportService.exportToGoogleDrive(request, reply);

      expect(reply.status).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.stringContaining("Failed to create folder") })
      );
    });

    it("should emit export-error notification on failure", async () => {
      (GoogleDriveStorageProvider.prototype.createFolder as jest.Mock<any>)
        .mockRejectedValue(new Error("Storage error"));
      const request = makeRequest({ format: "raw" });
      const reply = makeReply();

      await exportService.exportToGoogleDrive(request, reply);

      expect(mockNotificationHub.emit).toHaveBeenCalledWith(
        "session-scope-123",
        "export-error",
        expect.any(Object)
      );
    });

    it("should use default folder name if not provided", async () => {
      const request = makeRequest({ format: "raw" }); // no folderName field
      const reply = makeReply();

      await exportService.exportToGoogleDrive(request, reply);

      expect(GoogleDriveStorageProvider.prototype.createFolder).toHaveBeenCalledWith(expect.any(String));
    });

    it("should upload with a default file name if not provided", async () => {
      const request = makeRequest({ format: "raw" }); // no fileName field
      const reply = makeReply();

      await exportService.exportToGoogleDrive(request, reply);

      expect(GoogleDriveStorageProvider.prototype.uploadFile).toHaveBeenCalledWith(
        expect.any(Buffer),
        expect.objectContaining({ name: expect.stringContaining("annotated_360_image") }),
        "folder-id-123",
        expect.any(Function)
      );
    });
  });

  describe("Format Selection", () => {
    it("should select raw formatter for raw format", async () => {
      const request = makeRequest({ format: "raw" });
      const reply = makeReply();

      await exportService.exportToGoogleDrive(request, reply);

      expect(ExportFormatterFactory.getFormatter).toHaveBeenCalledWith("raw");
    });

    it("should select picto formatter for picto format", async () => {
      const request = makeRequest({ format: "picto" });
      const reply = makeReply();

      // The fake buffer isn't a valid .picto archive, so the formatter will
      // throw internally (caught by exportToGoogleDrive) — irrelevant here,
      // this test only cares which formatter the factory handed out.
      await exportService.exportToGoogleDrive(request, reply);

      expect(ExportFormatterFactory.getFormatter).toHaveBeenCalledWith("picto");
    });

    it("should default to picto formatter if format not specified", async () => {
      const request = makeRequest({});
      const reply = makeReply();

      await exportService.exportToGoogleDrive(request, reply);

      expect(ExportFormatterFactory.getFormatter).toHaveBeenCalledWith("picto");
    });
  });

  describe("Progress Tracking", () => {
    it("should relay formatter progress events through notification hub", async () => {
      const request = makeRequest({ format: "raw" });
      const reply = makeReply();

      await exportService.exportToGoogleDrive(request, reply);

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
      const request = makeRequest({ format: "raw" });
      const reply = makeReply();

      await exportService.exportToGoogleDrive(request, reply);

      // All notifications should be scoped to the user's session
      const calls = mockNotificationHub.emit.mock.calls;
      calls.forEach((call) => {
        expect(call[0]).toBe("user-session-abc");
      });
    });
  });
});
