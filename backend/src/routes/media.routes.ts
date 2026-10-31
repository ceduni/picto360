import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import MediaService, { CreateUploadInput, MediaScope, MediaServiceError } from "@/services/media.service";
import { authenticate } from "@/middlewares/firebaseAuth";
import { resolveUser } from "@/utils/resolveUser";

type CreateUploadBody = Partial<CreateUploadInput>;

const SCOPES: MediaScope[] = ["main", "annotation"];

function sendError(reply: FastifyReply, error: unknown) {
  if (error instanceof MediaServiceError) {
    return reply.code(error.statusCode).send({ message: error.message });
  }
  console.error("Media route error:", error);
  return reply.code(500).send({ error: "Server error", message: error instanceof Error ? error.message : String(error) });
}

/**
 * Step 1 of a direct upload: returns where (and how) the browser should send
 * the file, plus the PENDING media record.
 */
async function createUpload(
  request: FastifyRequest<{ Body: CreateUploadBody }>,
  reply: FastifyReply
) {
  const resolved = await resolveUser(request, reply);
  if (!resolved) return;

  const { playgroundId, filename, mimeType, size, scope = "main" } = request.body ?? {};
  if (!playgroundId || !filename || !mimeType || size === undefined) {
    return reply.code(400).send({ message: "'playgroundId', 'filename', 'mimeType' and 'size' are required" });
  }
  if (!SCOPES.includes(scope)) {
    return reply.code(400).send({ message: `'scope' must be one of ${SCOPES.join(", ")}` });
  }

  try {
    const ticket = await MediaService.createUpload(resolved.user, {
      playgroundId,
      filename,
      mimeType,
      size: Number(size),
      scope,
    });
    return reply.code(201).send(ticket);
  } catch (error) {
    return sendError(reply, error);
  }
}

/** Step 3 of a direct upload: verify the file landed and mark it READY. */
async function completeUpload(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const resolved = await resolveUser(request, reply);
  if (!resolved) return;

  try {
    const media = await MediaService.completeUpload(resolved.user, request.params.id);
    return reply.send(media);
  } catch (error) {
    return sendError(reply, error);
  }
}

/** The browser's upload failed or was cancelled: drop the PENDING record. */
async function abortUpload(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const resolved = await resolveUser(request, reply);
  if (!resolved) return;

  try {
    await MediaService.abortUpload(resolved.user, request.params.id);
    return reply.code(204).send();
  } catch (error) {
    return sendError(reply, error);
  }
}

async function getAccessUrl(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const resolved = await resolveUser(request, reply);
  if (!resolved) return;

  try {
    const access = await MediaService.getAccessUrl(resolved.user, request.params.id);
    return reply.send(access);
  } catch (error) {
    return sendError(reply, error);
  }
}

async function deleteMedia(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const resolved = await resolveUser(request, reply);
  if (!resolved) return;

  try {
    await MediaService.deleteMedia(resolved.user, request.params.id);
    return reply.code(204).send();
  } catch (error) {
    return sendError(reply, error);
  }
}

export default async function mediaRoutes(server: FastifyInstance) {
  server.post<{ Body: CreateUploadBody }>("/media/uploads", { preHandler: authenticate }, createUpload);
  server.post<{ Params: { id: string } }>("/media/uploads/:id/complete", { preHandler: authenticate }, completeUpload);
  server.post<{ Params: { id: string } }>("/media/uploads/:id/abort", { preHandler: authenticate }, abortUpload);
  server.get<{ Params: { id: string } }>("/media/:id/access-url", { preHandler: authenticate }, getAccessUrl);
  server.delete<{ Params: { id: string } }>("/media/:id", { preHandler: authenticate }, deleteMedia);
}
