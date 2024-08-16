import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ImageService from "@/services/image.service";
import { ImageDocument } from "@/models/image.model";

async function createImage(
  request: FastifyRequest<{ Body: ImageDocument }>,
  reply: FastifyReply
) {
  try {
    const image = await ImageService.createImage(request.body);
    reply.code(201).send(image);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
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
  server.post("/images", createImage);
  server.get("/images/:id", getImage);
  server.put("/images/:id", updateImage);
  server.delete("/images/:id", deleteImage);
  server.get("/images", getAllImages);
}
