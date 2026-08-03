/**
 * Export Routes Tests
 * export.routes.ts is a thin registration layer: it fetches the ExportService
 * singleton and binds its exportToGoogleDrive method directly as the route
 * handler. All request parsing/validation/error handling lives in
 * ExportService and is covered by export.service.test.ts.
 */

import { describe, it, expect, beforeEach, jest, afterEach } from "@jest/globals";
import { FastifyInstance } from "fastify";
import { ExportService, getExportService } from "@/services/export.service";
import exportRoutes from "../export.routes";

jest.mock("@/services/export.service");

describe("Export Routes", () => {
  let mockApp: jest.Mocked<FastifyInstance>;
  let mockExportService: jest.Mocked<ExportService>;

  beforeEach(async () => {
    mockApp = {
      post: jest.fn<() => void>(),
    } as unknown as jest.Mocked<FastifyInstance>;

    mockExportService = {
      exportToGoogleDrive: jest.fn(),
    } as unknown as jest.Mocked<ExportService>;

    (getExportService as jest.Mock).mockReturnValue(mockExportService);

    await exportRoutes(mockApp);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("registers POST /api/drive/export", () => {
    expect(mockApp.post).toHaveBeenCalledWith(
      "/api/drive/export",
      expect.any(Function)
    );
  });

  it("binds the export service's exportToGoogleDrive as the handler", () => {
    const [, handler] = mockApp.post.mock.calls[0];

    expect(handler).toBe(mockExportService.exportToGoogleDrive);
  });
});
