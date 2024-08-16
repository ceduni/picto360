import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import LinkContentService from "@/services/content/linkContent.service";
import { LinkContentDocument } from "@/models/content/linkContent.model";

async function createLinkContent(
  request: FastifyRequest<{ Body: LinkContentDocument }>,
  reply: FastifyReply
) {
  try {
    const linkContent = await LinkContentService.createLinkContent(
      request.body
    );
    reply.code(201).send(linkContent);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getLinkContent(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const linkContent = await LinkContentService.getLinkContent(
      request.params.id
    );
    if (linkContent) {
      reply.send(linkContent);
    } else {
      reply.code(404).send({ message: "LinkContent not found" });
    }
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function updateLinkContent(
  request: FastifyRequest<{
    Params: { id: string };
    Body: Partial<LinkContentDocument>;
  }>,
  reply: FastifyReply
) {
  try {
    const linkContent = await LinkContentService.updateLinkContent(
      request.params.id,
      request.body
    );
    reply.send(linkContent);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function deleteLinkContent(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    await LinkContentService.deleteLinkContent(request.params.id);
    reply.code(204).send();
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getAllLinkContent(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const linkContents = await LinkContentService.getAllLinkContent();
    reply.send(linkContents);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

export default async function linkContentRoutes(server: FastifyInstance) {
  server.post("/linkContents", createLinkContent);
  server.get("/linkContents/:id", getLinkContent);
  server.put("/linkContents/:id", updateLinkContent);
  server.delete("/linkContents/:id", deleteLinkContent);
  server.get("/linkContents", getAllLinkContent);
}
