import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import DimensionService from '../services/dimension.service';
import { DimensionDocument } from '../models/dimension.model';

async function createDimension(request: FastifyRequest<{ Body: DimensionDocument }>, reply: FastifyReply) {
  try {
    const dimension = await DimensionService.createDimension(request.body);
    reply.code(201).send(dimension);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getDimension(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const dimension = await DimensionService.getDimension(request.params.id);
    if (dimension) {
      reply.send(dimension);
    } else {
      reply.code(404).send({ message: 'Dimension not found' });
    }
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function updateDimension(request: FastifyRequest<{ Params: { id: string }; Body: Partial<DimensionDocument> }>, reply: FastifyReply) {
  try {
    const dimension = await DimensionService.updateDimension(request.params.id, request.body);
    reply.send(dimension);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function deleteDimension(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    await DimensionService.deleteDimension(request.params.id);
    reply.code(204).send();
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getAllDimensions(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const dimensions = await DimensionService.getAllDimensions();
    reply.send(dimensions);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

export default async function dimensionRoutes(server: FastifyInstance) {
  server.post('/dimensions', createDimension);
  server.get('/dimensions/:id', getDimension);
  server.put('/dimensions/:id', updateDimension);
  server.delete('/dimensions/:id', deleteDimension);
  server.get('/dimensions', getAllDimensions);
}
