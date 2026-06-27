import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ShapeContentService from "@/services/content/shapeContent.service";
import { ShapeContentDocument } from "@/models/content/shapeContent.model";

async function createShapeContent(
  request: FastifyRequest<{ Body: ShapeContentDocument }>,
  reply: FastifyReply
) {
  try {
    const shapeContent = await ShapeContentService.createShapeContent(
      request.body
    );
    reply.code(201).send(shapeContent);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getShapeContent(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const shapeContent = await ShapeContentService.getShapeContent(
      request.params.id
    );
    if (shapeContent) {
      reply.send(shapeContent);
    } else {
      reply.code(404).send({ message: "ShapeContent not found" });
    }
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function updateShapeContent(
  request: FastifyRequest<{
    Params: { id: string };
    Body: Partial<ShapeContentDocument>;
  }>,
  reply: FastifyReply
) {
  try {
    const shapeContent = await ShapeContentService.updateShapeContent(
      request.params.id,
      request.body
    );
    reply.send(shapeContent);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function deleteShapeContent(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    await ShapeContentService.deleteShapeContent(request.params.id);
    reply.code(204).send();
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getAllShapeContent(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const shapeContent = await ShapeContentService.getAllShapeContent();
    reply.send(shapeContent);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

export default async function shapeContentRoutes(server: FastifyInstance) {
  server.post("/shapeContents", createShapeContent);
  server.get("/shapeContents/:id", getShapeContent);
  server.put("/shapeContents/:id", updateShapeContent);
  server.delete("/shapeContents/:id", deleteShapeContent);
  server.get("/shapeContents", getAllShapeContent);
}
