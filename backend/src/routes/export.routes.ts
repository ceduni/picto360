import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { getExportService } from "@/services/export.service";
import { ExportFormat, HotspotData } from "@/types/export.types";

export default async function exportRoutes(app: FastifyInstance) {
  const exportService = getExportService();

  // Export to Google Drive
  app.post('/api/drive/export', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const formFields: Record<string, string> = {};
        let fileBuffer: Buffer | null = null;
        let filename = '';
        let mimetype = '';

        // Iterate through ALL multipart parts
        const parts = request.parts();
        for await (const part of parts) {
          if (part.type === 'file') {
            // Handle file part
            fileBuffer = await part.toBuffer();
            filename = part.filename;
            mimetype = part.mimetype;
          } else if (part.type === 'field') {
            // Handle text field parts
            formFields[part.fieldname] = part.value as string;
          }
        }

        if (!fileBuffer || fileBuffer.length === 0) {
          return reply.status(400).send({ error: 'Image or picto file required' });
        }

        const format = formFields.format as ExportFormat || 'picto';
        let annotations: HotspotData[] | undefined = undefined;

        if (format === "raw" && formFields.annotations) {
          try {
            annotations = JSON.parse(formFields.annotations);
          } catch (err) {
            return reply.status(400).send('Error: Invalid annotations JSON');
          }
        }

        const options = {
          format,
          fileName: formFields.fileName || undefined,
          folderName: formFields.folderName || undefined,
          includeMetadata: formFields.includeMetadata === 'true'
        };

        const result = await exportService.exportToGoogleDrive(request, {
          fileBuffer,
          annotations,
          options,
        });

        return result;

    } catch (error) {
      reply.status(500).send({
        error: error instanceof Error ? error.message : 'Export failed'
      });
    }
  });
}
