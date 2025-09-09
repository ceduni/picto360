import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";


import { getGoogleDriveService, HotspotData } from "@/services/googleDrive.service";
import { MultipartValue } from "@fastify/multipart";

type ExportFormat  = "raw" | "picto";

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
        
        // Get form fields
        console.log("START File to buffer", Date.now());
        const fileBuffer = await data.toBuffer();
        console.log("END File to buffer", Date.now());
        // typed view of fields: key -> MultipartValue[] (or undefined)
        const fields = data.fields as Record<string, MultipartValue | MultipartValue[] | undefined>;

        const formFields = Object.fromEntries(
            Object.entries(fields).map(([key, field]) => {
              if (!field) return [key, undefined];

              // Case: single object
              if (!Array.isArray(field)) {
                return [key, field.value?.toString()];
              }

              // Case: array of values (multiple form entries with same name)
              return [key, field[0]?.value?.toString()];
            })

        );

        const format = formFields.format as ExportFormat|undefined;

        let annotations: HotspotData[]|undefined = undefined;

        if (format==="raw" && formFields.annotations) {

          try {
            annotations = JSON.parse(formFields.annotations);
          } catch (err) {
            console.error("❌ Failed to parse annotations:", formFields.annotations, err);
          }

          if(!annotations){
            return reply.code(400).send(`Error: The annotations array does not exist : ${JSON.stringify(annotations)}`)
          }   
        }            

        const options = {
            format: format || "picto" ,
            fileName: formFields.fileName as string || undefined,
            folderName: formFields.folderName as string || undefined,
            includeMetadata: formFields.includeMetadata === 'true'
        };

        // Export to Google Drive
        const result = await driveService.exportToGoogleDrive(
            fileBuffer,
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