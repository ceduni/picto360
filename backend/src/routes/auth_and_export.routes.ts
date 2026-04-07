import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "crypto";
import { getAuthService } from "@/services/auth.service";

export default async function authAndExportRoutes(app: FastifyInstance) {
  const authService = getAuthService("google");

  app.post("/api/drive/auth-and-export-url", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { returnTo, viewerId } = request.body as {
        returnTo?: string;
        viewerId?: string;
      };
      const state = randomUUID();
      const authUrl = authService.generateAuthUrl(state);

      (request.session as any).oauth_state = state;
      (request.session as any).oauth_metadata = {
        returnTo,
        viewerId,
        autoExport: true,
      };
      await request.session.save?.();

      return reply.status(200).send({ authUrl });
    } catch (_error) {
      return reply.status(500).send({ error: "Failed to generate auth URL" });
    }
  });
}
