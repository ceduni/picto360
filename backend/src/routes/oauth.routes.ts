import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAuthService } from "@/services/auth.service";


/**
 * Refactored OAuth routes using new auth.service
 * Clean abstraction - works with any OAuth provider
 */
export default async function oauthRoutes(app: FastifyInstance) {
  const authService = getAuthService("google"); // Can add "onedrive" or other cloud providers later

  /**
   * Generate OAuth authorization URL
   */
  app.post("/api/drive/auth-url", authService.generateAuthUrl);

  /**
   * Handle OAuth callback from provider
   */
  app.get("/api/drive/auth/callback",authService.handleOauthCallBack);

  /**
   * Get current authentication status
   */
  app.get("/api/auth/status", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const status = await authService.getAuthStatus(request);
      return status.isAuthenticated ? reply.send({
                                      email: status.user?.email,
                                      displayName: status.user?.displayName,
                                      authenticated: status.isAuthenticated,
                                      provider: status.provider })
              : reply.status(401).send({ authenticated: false });
    } catch (error) {
      return reply.status(500).send({ error: "Failed to get auth status" });
    }
  });

  /**
   * Server-Sent Events stream for real-time notifications
   * Broadcasts auth status, export progress, and other events
   */
  app.get("/api/auth/stream", authService.startSSEstream);

  /**
   * Logout and disconnect authentication
   */
  app.post("/api/auth/logout", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const connected = await authService.disconnect(request);

      if (!connected) {
        return reply.status(401).send({ error: "Not authenticated" });
      }

      return reply.send({ ok: true });
    } catch (error) {
      return reply.status(500).send({ error: "Failed to logout" });
    }
  });
}
