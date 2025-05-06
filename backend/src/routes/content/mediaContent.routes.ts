import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import MediaContentService from "@/services/content/mediaContent.service";
import { MediaContentDocument } from "@/models/content/mediaContent.model";

async function createMediaContent(
  request: FastifyRequest<{ Body: MediaContentDocument }>,
  reply: FastifyReply
) {
  try {
    const mediaContent = await MediaContentService.createMediaContent(
      request.body
    );
    reply.code(201).send(mediaContent);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getMediaContent(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const mediaContent = await MediaContentService.getMediaContent(
      request.params.id
    );
    if (mediaContent) {
      reply.send(mediaContent);
    } else {
      reply.code(404).send({ message: "MediaContent not found" });
    }
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function updateMediaContent(
  request: FastifyRequest<{
    Params: { id: string };
    Body: Partial<MediaContentDocument>;
  }>,
  reply: FastifyReply
) {
  try {
    const mediaContent = await MediaContentService.updateMediaContent(
      request.params.id,
      request.body
    );
    reply.send(mediaContent);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function deleteMediaContent(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    await MediaContentService.deleteMediaContent(request.params.id);
    reply.code(204).send();
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getAllMediaContents(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const mediaContents = await MediaContentService.getAllMediaContents();
    reply.send(mediaContents);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

export default async function mediaContentRoutes(server: FastifyInstance) {
  server.post("/mediaContents", createMediaContent);
  server.get("/mediaContents/:id", getMediaContent);
  server.put("/mediaContents/:id", updateMediaContent);
  server.delete("/mediaContents/:id", deleteMediaContent);
  server.get("/mediaContents", getAllMediaContents);
}
