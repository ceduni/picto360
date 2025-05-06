import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import ContentService from '@/services/content/content.service';
import { ContentDocument } from '@/models/content/content.model';

async function createContent(request: FastifyRequest<{ Body: ContentDocument }>, reply: FastifyReply) {
  try {
    const content = await ContentService.createContent(request.body);
    reply.code(201).send(content);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getContent(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const content = await ContentService.getContent(request.params.id);
    if (content) {
      reply.send(content);
    } else {
      reply.code(404).send({ message: 'Content not found' });
    }
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function updateContent(request: FastifyRequest<{ Params: { id: string }; Body: Partial<ContentDocument> }>, reply: FastifyReply) {
  try {
    const content = await ContentService.updateContent(request.params.id, request.body);
    reply.send(content);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function deleteContent(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    await ContentService.deleteContent(request.params.id);
    reply.code(204).send();
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getAllContents(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const contents = await ContentService.getAllContents();
    reply.send(contents);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

export default async function contentRoutes(server: FastifyInstance) {
  server.post('/content', createContent);
  server.get('/content/:id', getContent);
  server.put('/content/:id', updateContent);
  server.delete('/content/:id', deleteContent);
  server.get('/content', getAllContents);
}
