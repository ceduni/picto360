import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import FormContentService from "@/services/content/formContent.service";
import { FormContentDocument } from "@/models/content/formContent.model";

async function createFormContent(
  request: FastifyRequest<{ Body: FormContentDocument }>,
  reply: FastifyReply
) {
  try {
    const formContent = await FormContentService.createFormContent(
      request.body
    );
    reply.code(201).send(formContent);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getFormContent(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const formContent = await FormContentService.getFormContent(
      request.params.id
    );
    if (formContent) {
      reply.send(formContent);
    } else {
      reply.code(404).send({ message: "FormContent not found" });
    }
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function updateFormContent(
  request: FastifyRequest<{
    Params: { id: string };
    Body: Partial<FormContentDocument>;
  }>,
  reply: FastifyReply
) {
  try {
    const formContent = await FormContentService.updateFormContent(
      request.params.id,
      request.body
    );
    reply.send(formContent);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function deleteFormContent(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    await FormContentService.deleteFormContent(request.params.id);
    reply.code(204).send();
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getAllFormContent(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const formContents = await FormContentService.getAllFormContent();
    reply.send(formContents);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

export default async function formContentRoutes(server: FastifyInstance) {
  server.post("/formContents", createFormContent);
  server.get("/formContents/:id", getFormContent);
  server.put("/formContents/:id", updateFormContent);
  server.delete("/formContents/:id", deleteFormContent);
  server.get("/formContents", getAllFormContent);
}
