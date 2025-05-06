import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import ProjectService from '@/services/project.service';
import { ProjectDocument } from '@/models/project.model';

async function createProject(request: FastifyRequest<{ Body: ProjectDocument }>, reply: FastifyReply) {
  try {
    const project = await ProjectService.createProject(request.body);
    reply.code(201).send(project);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getProject(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const project = await ProjectService.getProject(request.params.id);
    if (project) {
      reply.send(project);
    } else {
      reply.code(404).send({ message: 'Project not found' });
    }
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function updateProject(request: FastifyRequest<{ Params: { id: string }; Body: Partial<ProjectDocument> }>, reply: FastifyReply) {
  try {
    const project = await ProjectService.updateProject(request.params.id, request.body);
    reply.send(project);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function deleteProject(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    await ProjectService.deleteProject(request.params.id);
    reply.code(204).send();
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

async function getAllProjects(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const projects = await ProjectService.getAllProjects();
    reply.send(projects);
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}

export default async function projectRoutes(server: FastifyInstance) {
  server.post('/projects', createProject);
  server.get('/projects/:id', getProject);
  server.put('/projects/:id', updateProject);
  server.delete('/projects/:id', deleteProject);
  server.get('/projects', getAllProjects);
}
