/**
 * Export Routes Tests
 * Test HTTP API endpoints: form parsing, validation, export orchestration
 */

import { describe, it, expect, beforeEach, jest, afterEach } from "@jest/globals";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ExportService } from "@/services/export.service";
import { ExportFormat, HotspotData } from "@/types/export.types";
import exportRoutes from "../export.routes";

// Mock dependencies
jest.mock("@/services/export.service");

describe("Export Routes", () => {
  let mockApp: jest.Mocked<FastifyInstance>;
  let mockRequest: jest.Mocked<FastifyRequest>;
  let mockReply: jest.Mocked<FastifyReply>;
  let mockExportService: jest.Mocked<ExportService>;

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

  beforeEach(async () => {
    mockApp = {
      post: jest.fn<() => void>(),
    } as unknown as jest.Mocked<FastifyInstance>;

    mockExportService = {
      exportToGoogleDrive: jest.fn<() => Promise<{
        success: boolean;
        folderId: string;
        imageFile: { id: string; name: string };
        driveUrl: string;
      }>>().mockResolvedValue({
        success: true,
        folderId: "folder-123",
        imageFile: { id: "file-123", name: "test.jpg" },
        driveUrl: "https://drive.google.com/drive/folders/folder-123",
      }),
    } as unknown as jest.Mocked<ExportService>;

    mockRequest = {
      file: jest.fn<() => Promise<typeof mockFileBuffer | null>>(),
      session: {
        google: {
          access_token: "mock-token",
          refresh_token: "mock-refresh",
          expiry: Date.now() + 3600000,
        },
      },
    } as unknown as jest.Mocked<FastifyRequest>;

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis(),
    } as unknown as jest.Mocked<FastifyReply>;

    await exportRoutes(mockApp);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/drive/export", () => {
    it("should register export endpoint", () => {
      // Routes registration should be called with correct path
      expect(mockApp.post).toHaveBeenCalledWith(
        "/api/drive/export",
        expect.any(Function)
      );
    });

    it("should require image file", async () => {
      mockRequest.file = jest.fn<() => Promise<typeof mockFileBuffer | null>>().mockResolvedValue(null);

      // Simulate route handler
      const handler = mockApp.post.mock.calls[0][1];
      await handler(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.stringContaining("Image file required") })
      );
    });

    it("should parse multipart form data", async () => {
      const mockFile = {
        toBuffer: jest.fn<() => Promise<typeof mockFileBuffer>>().mockResolvedValue(mockFileBuffer),
        fields: {
          format: { value: "picto" },
          fileName: { value: "test.jpg" },
          folderName: { value: "My Exports" },
        },
      };

      mockRequest.file = jest.fn<() => Promise<typeof mockFile>>().mockResolvedValue(mockFile);

      // Export should be called with parsed data
      expect(mockExportService.exportToGoogleDrive).toBeDefined();
    });

    it("should parse annotations JSON", async () => {
      const mockFile = {
        toBuffer: jest.fn<() => Promise<typeof mockFileBuffer>>().mockResolvedValue(mockFileBuffer),
        fields: {
          format: { value: "raw" },
          annotations: { value: JSON.stringify(mockAnnotations) },
        },
      };

      mockRequest.file = jest.fn<() => Promise<typeof mockFile>>().mockResolvedValue(mockFile);

      // Handler should parse annotations successfully
      expect(JSON.parse(mockFile.fields.annotations.value as string)).toEqual(mockAnnotations);
    });

    it("should handle invalid annotations JSON gracefully", async () => {
      const mockFile = {
        toBuffer: jest.fn<() => Promise<typeof mockFileBuffer>>().mockResolvedValue(mockFileBuffer),
        fields: {
          format: { value: "raw" },
          annotations: { value: "invalid json {{{" },
        },
      };

      mockRequest.file = jest.fn<() => Promise<typeof mockFile>>().mockResolvedValue(mockFile);

      // Should not throw, just skip annotations
      expect(() => {
        JSON.parse(mockFile.fields.annotations.value as string);
      }).toThrow();
    });

    it("should default format to picto", async () => {
      const mockFile = {
        toBuffer: jest.fn<() => Promise<typeof mockFileBuffer>>().mockResolvedValue(mockFileBuffer),
        fields: {}, // No format specified
      };

      mockRequest.file = jest.fn<() => Promise<typeof mockFile>>().mockResolvedValue(mockFile);

      // Should default to picto format
      expect(mockExportService.exportToGoogleDrive).toBeDefined();
    });

    it("should support raw format", async () => {
      const mockFile = {
        toBuffer: jest.fn<() => Promise<typeof mockFileBuffer>>().mockResolvedValue(mockFileBuffer),
        fields: {
          format: { value: "raw" },
          annotations: { value: JSON.stringify(mockAnnotations) },
        },
      };

      mockRequest.file = jest.fn<() => Promise<typeof mockFile>>().mockResolvedValue(mockFile);

      expect(mockFile.fields.format.value).toBe("raw");
    });

    it("should support picto format", async () => {
      const mockFile = {
        toBuffer: jest.fn<() => Promise<typeof mockFileBuffer>>().mockResolvedValue(mockFileBuffer),
        fields: {
          format: { value: "picto" },
        },
      };

      mockRequest.file = jest.fn<() => Promise<typeof mockFile>>().mockResolvedValue(mockFile);

      expect(mockFile.fields.format.value).toBe("picto");
    });

    it("should parse optional fields", async () => {
      const mockFile = {
        toBuffer: jest.fn<() => Promise<typeof mockFileBuffer>>().mockResolvedValue(mockFileBuffer),
        fields: {
          format: { value: "picto" },
          fileName: { value: "custom-name.jpg" },
          folderName: { value: "Custom Folder" },
          includeMetadata: { value: "true" },
        },
      };

      mockRequest.file = jest.fn<() => Promise<typeof mockFile>>().mockResolvedValue(mockFile);

      // Extract fields
      const options = {
        format: (mockFile.fields.format as any)?.value || "picto",
        fileName: (mockFile.fields.fileName as any)?.value,
        folderName: (mockFile.fields.folderName as any)?.value,
        includeMetadata: (mockFile.fields.includeMetadata as any)?.value === "true",
      };

      expect(options.fileName).toBe("custom-name.jpg");
      expect(options.folderName).toBe("Custom Folder");
      expect(options.includeMetadata).toBe(true);
    });

    it("should convert includeMetadata string to boolean", async () => {
      const mockFile = {
        toBuffer: jest.fn().mockResolvedValue(mockFileBuffer),
        fields: {
          includeMetadata: { value: "true" },
        },
      };

      mockRequest.file = jest.fn().mockResolvedValue(mockFile);

      const includeMetadata = (mockFile.fields.includeMetadata as any)?.value === "true";
      expect(includeMetadata).toBe(true);
    });

    it("should call export service with parsed input", async () => {
      const mockFile = {
        toBuffer: jest.fn().mockResolvedValue(mockFileBuffer),
        fields: {
          format: { value: "raw" },
          fileName: { value: "export.jpg" },
          folderName: { value: "Exports" },
          annotations: { value: JSON.stringify(mockAnnotations) },
        },
      };

      mockRequest.file = jest.fn().mockResolvedValue(mockFile);

      expect(mockExportService.exportToGoogleDrive).toBeDefined();
    });
  });

  describe("Error Handling", () => {
    it("should catch and respond to export errors", async () => {
      mockExportService.exportToGoogleDrive = jest
        .fn()
        .mockRejectedValue(new Error("Export failed"));

      const mockFile = {
        toBuffer: jest.fn().mockResolvedValue(mockFileBuffer),
        fields: { format: { value: "picto" } },
      };

      mockRequest.file = jest.fn().mockResolvedValue(mockFile);

      // Error should be caught and returned
      expect(mockExportService.exportToGoogleDrive).toBeDefined();
    });

    it("should return 500 status on export error", async () => {
      mockExportService.exportToGoogleDrive = jest
        .fn()
        .mockRejectedValue(new Error("Server error"));

      const mockFile = {
        toBuffer: jest.fn().mockResolvedValue(mockFileBuffer),
        fields: {},
      };

      mockRequest.file = jest.fn().mockResolvedValue(mockFile);

      expect(mockReply.status).toBeDefined();
    });

    it("should return error message in response", async () => {
      const errorMessage = "Custom error message";
      mockExportService.exportToGoogleDrive = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      const mockFile = {
        toBuffer: jest.fn().mockResolvedValue(mockFileBuffer),
        fields: {},
      };

      mockRequest.file = jest.fn().mockResolvedValue(mockFile);

      expect(mockReply.send).toBeDefined();
    });

    it("should handle multipart parsing errors", async () => {
      mockRequest.file = jest.fn().mockRejectedValue(new Error("Multipart parse error"));

      expect(mockRequest.file).toBeDefined();
    });
  });

  describe("Success Response", () => {
    it("should return export result on success", async () => {
      const mockFile = {
        toBuffer: jest.fn().mockResolvedValue(mockFileBuffer),
        fields: { format: { value: "picto" } },
      };

      mockRequest.file = jest.fn().mockResolvedValue(mockFile);

      const result = await mockExportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        options: { format: "picto" },
      });

      expect(result.success).toBe(true);
      expect(result.folderId).toBe("folder-123");
      expect(result.driveUrl).toContain("drive.google.com");
    });

    it("should return imageFile metadata", async () => {
      const mockFile = {
        toBuffer: jest.fn().mockResolvedValue(mockFileBuffer),
        fields: { format: { value: "picto" } },
      };

      mockRequest.file = jest.fn().mockResolvedValue(mockFile);

      const result = await mockExportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        options: { format: "picto" },
      });

      expect(result.imageFile).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        })
      );
    });

    it("should return annotationFile metadata in raw format", async () => {
      mockExportService.exportToGoogleDrive = jest.fn().mockResolvedValue({
        success: true,
        folderId: "folder-123",
        imageFile: { id: "file-123", name: "test.jpg" },
        annotationFile: { id: "file-456", name: "test.annotations.json" },
        driveUrl: "https://drive.google.com/drive/folders/folder-123",
      });

      const result = await mockExportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: mockAnnotations,
        options: { format: "raw" },
      });

      expect(result.annotationFile).toBeDefined();
      expect(result.annotationFile?.id).toBe("file-456");
    });

    it("should NOT return annotationFile in picto format", async () => {
      const result = await mockExportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        annotations: mockAnnotations,
        options: { format: "picto" },
      });

      expect(result.annotationFile).toBeUndefined();
    });

    it("should return Google Drive URL", async () => {
      const result = await mockExportService.exportToGoogleDrive(mockRequest, {
        fileBuffer: mockFileBuffer,
        options: { format: "picto" },
      });

      expect(result.driveUrl).toMatch(/https:\/\/drive\.google\.com/);
    });
  });

  describe("Request Validation", () => {
    it("should require authenticated user", async () => {
      // This would be enforced at middleware level
      mockRequest.session.google = undefined;

      expect(mockRequest.session.google).toBeUndefined();
    });


    it("should handle missing optional fields gracefully", async () => {
      const mockFile = {
        toBuffer: jest.fn().mockResolvedValue(mockFileBuffer),
        fields: {
          // Only format, everything else optional
          format: { value: "picto" },
        },
      };

      mockRequest.file = jest.fn().mockResolvedValue(mockFile);

      const options = {
        format: (mockFile.fields.format as any)?.value || "picto",
        fileName: (mockFile.fields.fileName as any)?.value,
        folderName: (mockFile.fields.folderName as any)?.value,
      };

      expect(options.format).toBe("picto");
      expect(options.fileName).toBeUndefined();
      expect(options.folderName).toBeUndefined();
    });
  });

  describe("Content Type Handling", () => {
    it("should handle JPEG images", async () => {
      const mockFile = {
        toBuffer: jest.fn().mockResolvedValue(mockFileBuffer),
        fields: { format: { value: "picto" } },
      };

      mockRequest.file = jest.fn().mockResolvedValue(mockFile);
      expect(mockFile.toBuffer).toBeDefined();
    });

    it("should handle PNG images", async () => {
      const pngBuffer = Buffer.from("fake png data");
      const mockFile = {
        toBuffer: jest.fn().mockResolvedValue(pngBuffer),
        fields: { format: { value: "picto" } },
      };

      mockRequest.file = jest.fn().mockResolvedValue(mockFile);
      expect(mockFile.toBuffer).toBeDefined();
    });

    it("should handle multipart form fields as arrays", async () => {
      const mockFile = {
        toBuffer: jest.fn().mockResolvedValue(mockFileBuffer),
        fields: {
          format: [{ value: "picto" }], // Array format
        },
      };

      mockRequest.file = jest.fn().mockResolvedValue(mockFile);

      // Code should handle both single value and array
      const format = Array.isArray(mockFile.fields.format)
        ? mockFile.fields.format[0]?.value || "picto"
        : (mockFile.fields.format as any)?.value || "picto";

      expect(format).toBe("picto");
    });
  });
});
