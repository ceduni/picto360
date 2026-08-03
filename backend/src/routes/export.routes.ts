import { FastifyInstance } from "fastify";

import { getExportService } from "@/services/export.service";

export default async function exportRoutes(app: FastifyInstance) {
  const exportService = getExportService();

  // Export to Google Drive
  app.post('/api/drive/export', exportService.exportToGoogleDrive);
}
