import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import AnnotationService from '../services/annotation.service';
import { AnnotationDocument } from '../models/annotation.model';
import { authenticate } from '@/middlewares/firebaseAuth';

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

/**
 * Participant-safe read path: only returns annotations with `visible: true`
 * for the given project. This is the ONLY annotation endpoint that should
 * ever be called from a participant-facing client, since the other routes
 * above return every annotation (including hidden treasure-hunt targets)
 * unrestricted, for the creator/editor's full-scene view.
 *
 * SECURITY / OPEN QUESTION: this route currently has NO auth guard. The
 * codebase has no participant-specific auth/session mechanism yet (the
 * sharingLink model/service referenced by sharingLink.routes.ts don't even
 * exist in this tree, and the only auth middleware, `authenticate` in
 * middlewares/firebaseAuth.ts, is for Firebase-authenticated
 * creators/supervisors, not participants). Until a participant auth/session
 * mechanism exists, this endpoint is reachable by anyone who can guess a
 * project id. This needs an explicit human decision before/around ship time.
 */
async function getVisibleAnnotationsForProject(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const annotations = await AnnotationService.getVisibleAnnotationsForProject(
      request.params.id
    );
    reply.send(annotations);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getAnnotationsForProject(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const annotations = await AnnotationService.getAnnotationsForProject(request.params.id);
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
  server.get('/projects/:id/annotations/visible', getVisibleAnnotationsForProject);
  server.get<{ Params: { id: string } }>(
    '/projects/:id/annotations',
    { preHandler: authenticate },
    getAnnotationsForProject
  );
}
