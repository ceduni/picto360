import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { getExportService } from "@/services/export.service";
import { ExportFormat, HotspotData } from "@/types/export.types";

export default async function exportRoutes(app: FastifyInstance) {
  const exportService = getExportService();

  // Export to Google Drive
  app.post('/api/drive/export', exportService.exportToGoogleDrive);
}
