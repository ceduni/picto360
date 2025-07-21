import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import AnnotationService from '../services/annotation.service';
import { AnnotationDocument } from '../models/annotation.model';

async function createAnnotation(request: FastifyRequest<{ Body: AnnotationDocument }>, reply: FastifyReply) {
  try {
    const annotation = await AnnotationService.createAnnotation(request.body);
    reply.code(201).send(annotation);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getAnnotation(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const annotation = await AnnotationService.getAnnotation(request.params.id);
    if (annotation) {
      reply.send(annotation);
    } else {
      reply.code(404).send({ message: 'Annotation not found' });
    }
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function updateAnnotation(request: FastifyRequest<{ Params: { id: string }; Body: Partial<AnnotationDocument> }>, reply: FastifyReply) {
  try {
    const annotation = await AnnotationService.updateAnnotation(request.params.id, request.body);
    reply.send(annotation);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function deleteAnnotation(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    await AnnotationService.deleteAnnotation(request.params.id);
    reply.code(204).send();
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getAllAnnotations(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const annotations = await AnnotationService.getAllAnnotations();
    reply.send(annotations);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

export default async function annotationRoutes(server: FastifyInstance) {
  server.post('/annotations', createAnnotation);
  server.get('/annotations/:id', getAnnotation);
  server.put('/annotations/:id', updateAnnotation);
  server.delete('/annotations/:id', deleteAnnotation);
  server.get('/annotations', getAllAnnotations);
}
