import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";


import { getGoogleDriveService, HotspotData } from "@/services/googleDrive.service";
import { MultipartValue } from "@fastify/multipart";

interface ExportRequest {
  annotations: HotspotData[];
  imageName?: string;
  folderName?: string;
  includeMetadata?: boolean;
}

export default async function exportRoutes(app: FastifyInstance) {
  // Export to Google Drive
  app.post('/api/drive/export', async (request: FastifyRequest, reply: FastifyReply) => {
    const driveService = getGoogleDriveService();
    try {
        const token = await driveService.ensureAccessToken(request);
        driveService.setAccessToken(token);

        // Parse multipart form data
        const data = await request.file();
        if (!data) {
            return reply.status(400).send({ error: `Image file required: ${data}` });
        }

        // for await (const part of request.parts()) {
        //   if (part.type === "file") {
        //     console.log({ name: part.fieldname, filename: part.filename }, "got file");
        //   } else {
        //     console.log({ name: part.fieldname, value: part.value }, "got field");
        //   }
        // }        
        // return reply.send("ok");
        
        // Get form fields
        const imageBuffer = await data.toBuffer();
        // typed view of fields: key -> MultipartValue[] (or undefined)
        const fields = data.fields as Record<string, MultipartValue[] | undefined>;

        const formFields = Object.fromEntries(
          Object.entries(fields).map(([key, arr]) => [key, arr?.[0]?.value])
        );

        const annotations: HotspotData[] = formFields.annotations 
            ? JSON.parse(formFields.annotations as string) 
            : [];

        const options = {
            imageName: formFields.imageName as string || undefined,
            folderName: formFields.folderName as string || undefined,
            includeMetadata: formFields.includeMetadata === 'true'
        };

        // Export to Google Drive
        const result = await driveService.exportToGoogleDrive(
            imageBuffer,
            annotations,
            options
        );

        return result;

    } catch (error) {
      console.error('Export error:', error);
      reply.status(500).send({ 
        error: error instanceof Error ? error.message : 'Export failed' 
      });
    }
  });
}