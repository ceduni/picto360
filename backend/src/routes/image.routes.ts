import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ImageService from "@/services/image.service";
import { ImageDocument } from "@/models/image.model";
import { getDirectUploadUrl } from "@/middlewares/cloudflare";
import { authenticate } from "@/middlewares/firebaseAuth";

// Multipart is registered globally (see server.ts, fastify/multipart with no
// attachFieldsToBody), so the uploaded file must be read via request.file(),
// not request.body — mirrors imageCompression.routes.ts's working pattern.
async function createImage(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const data = await request.file();
    if (!data) {
      return reply.code(400).send({ error: "No file uploaded" });
    }
    const buffer = await data.toBuffer();
    const image = await ImageService.uploadRawImage(data.filename, buffer, data.mimetype);
    reply.code(201).send(image);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getUploadUrl(
  request: FastifyRequest,
  reply: FastifyReply
){
  try{
    const upload = await getDirectUploadUrl()
    reply.code(200).send({id: upload.id, upload_url: upload.uploadURL})
  }catch(err: any){
    reply.code(500).send({ error: err.message })
  }
}

async function getImage(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const image = await ImageService.getImage(request.params.id);
    if (image) {
      reply.send(image);
    } else {
      reply.code(404).send({ message: "Image not found" });
    }
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function updateImage(
  request: FastifyRequest<{
    Params: { id: string };
    Body: Partial<ImageDocument>;
  }>,
  reply: FastifyReply
) {
  try {
    const image = await ImageService.updateImage(
      request.params.id,
      request.body
    );
    reply.send(image);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function deleteImage(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    await ImageService.deleteImage(request.params.id);
    reply.code(204).send();
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getAllImages(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const images = await ImageService.getAllImages();
    reply.send(images);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

export default async function imageRoutes(server: FastifyInstance) {
  server.post("/images", { preHandler: authenticate }, createImage);
  server.post("/images/upload-url", { preHandler: authenticate }, getUploadUrl);
  server.get<{ Params: { id: string } }>("/images/:id", { preHandler: authenticate }, getImage);
  server.put<{ Params: { id: string }; Body: Partial<ImageDocument> }>(
    "/images/:id",
    { preHandler: authenticate },
    updateImage
  );
  server.delete<{ Params: { id: string } }>("/images/:id", { preHandler: authenticate }, deleteImage);
  server.get("/images", { preHandler: authenticate }, getAllImages);
}
