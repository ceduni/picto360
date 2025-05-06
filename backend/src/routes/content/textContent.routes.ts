import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import TextContentService from '@/services/content/textContent.service';
import { TextContentDocument } from '@/models/content/textContent.model';

async function createTextContent(request: FastifyRequest<{ Body: TextContentDocument }>, reply: FastifyReply) {
  try {
    const textContent = await TextContentService.createTextContent(request.body);
    reply.code(201).send(textContent);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getTextContent(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const textContent = await TextContentService.getTextContent(request.params.id);
    if (textContent) {
      reply.send(textContent);
    } else {
      reply.code(404).send({ message: 'TextContent not found' });
    }
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function updateTextContent(request: FastifyRequest<{ Params: { id: string }; Body: Partial<TextContentDocument> }>, reply: FastifyReply) {
  try {
    const textContent = await TextContentService.updateTextContent(request.params.id, request.body);
    reply.send(textContent);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function deleteTextContent(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    await TextContentService.deleteTextContent(request.params.id);
    reply.code(204).send();
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getAllTextContents(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const textContents = await TextContentService.getAllTextContents();
    reply.send(textContents);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

export default async function textContentRoutes(server: FastifyInstance) {
  server.post('/textContents', createTextContent);
  server.get('/textContents/:id', getTextContent);
  server.put('/textContents/:id', updateTextContent);
  server.delete('/textContents/:id', deleteTextContent);
  server.get('/textContents', getAllTextContents);
}
