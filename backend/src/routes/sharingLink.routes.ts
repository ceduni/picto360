import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import SharingLinkService from "@/services/sharingLink.service";
import { SharingLinkDocument } from "@/models/sharingLink.model";

async function createSharingLink(
  request: FastifyRequest<{ Body: SharingLinkDocument }>,
  reply: FastifyReply
) {
  try {
    const sharingLink = await SharingLinkService.createSharingLink(
      request.body
    );
    reply.code(201).send(sharingLink);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getSharingLink(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const sharingLink = await SharingLinkService.getSharingLink(
      request.params.id
    );
    if (sharingLink) {
      reply.send(sharingLink);
    } else {
      reply.code(404).send({ message: "Sharing Link not found" });
    }
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function updateSharingLink(
  request: FastifyRequest<{
    Params: { id: string };
    Body: Partial<SharingLinkDocument>;
  }>,
  reply: FastifyReply
) {
  try {
    const sharingLink = await SharingLinkService.updateSharingLink(
      request.params.id,
      request.body
    );
    reply.send(sharingLink);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function deleteSharingLink(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    await SharingLinkService.deleteSharingLink(request.params.id);
    reply.code(204).send();
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getAllSharingLinks(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const sharingLinks = await SharingLinkService.getAllSharingLinks();
    reply.send(sharingLinks);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

export default async function sharingLinkRoutes(server: FastifyInstance) {
  server.post("/sharingLinks", createSharingLink);
  server.get("/sharingLinks/:id", getSharingLink);
  server.put("/sharingLinks/:id", updateSharingLink);
  server.delete("/sharingLinks/:id", deleteSharingLink);
  server.get("/sharingLinks", getAllSharingLinks);
}
