import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { getExportService } from "@/services/export.service";
import { MultipartValue } from "@fastify/multipart";
import { ExportFormat, HotspotData } from "@/types/export.types";

export default async function exportRoutes(app: FastifyInstance) {
  // Export to Google Drive
  app.post('/api/drive/export', async (request: FastifyRequest, reply: FastifyReply) => {
    const exportService = getExportService();
    try {
        const formFields: Record<string, string> = {};
        let fileBuffer: Buffer | null = null;
        let filename = '';
        let mimetype = '';

        // ✅ Iterate through ALL multipart parts
        const parts = request.parts();
        for await (const part of parts) {
          if (part.type === 'file') {
            // Handle file part
            fileBuffer = await part.toBuffer();
            filename = part.filename;
            mimetype = part.mimetype;
            console.log("Received file:", { filename, mimetype, size: fileBuffer.length });
          } else if (part.type === 'field') {
            // Handle text field parts
            formFields[part.fieldname] = part.value as string;
          }
        }

        if (!fileBuffer || fileBuffer.length === 0) {
          return reply.status(400).send({ error: 'Image file required' });
        }

        console.log("Received export request with fields:", formFields);

        const format = formFields.format as ExportFormat || 'picto';
        let annotations: HotspotData[] | undefined = undefined;

        if (format === "raw" && formFields.annotations) {
          try {
            annotations = JSON.parse(formFields.annotations);
          } catch (err) {
            console.error("❌ Failed to parse annotations:", formFields.annotations, err);
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
      console.error('Export error:', error);
      reply.status(500).send({
        error: error instanceof Error ? error.message : 'Export failed'
      });
    }
  });
}
