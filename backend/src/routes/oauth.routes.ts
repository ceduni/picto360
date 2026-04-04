import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "crypto";
import { getAuthService } from "@/services/auth.service";
import { getExportService } from "@/services/export.service";
import { getNotificationHubService } from "@/services/notificationHub.service";

interface OAuthRedirectMetadata {
  returnTo?: string;
  viewerId?: string;
  autoExport?: boolean;
}

function getFrontendBaseUrl() {
  return process.env.FRONTEND_SERVER || "http://localhost:3000";
}

function getFallbackFrontendPath(metadata?: OAuthRedirectMetadata, fallbackPath = "/") {
  if (metadata?.viewerId) {
    return `/view/${encodeURIComponent(metadata.viewerId)}`;
  }

  return fallbackPath;
}

function getSafeFrontendPath(metadata?: OAuthRedirectMetadata, fallbackPath = "/") {
  const frontendUrl = new URL(getFrontendBaseUrl());
  const safeFallbackPath = getFallbackFrontendPath(metadata, fallbackPath);

  if (!metadata?.returnTo) {
    return safeFallbackPath;
  }

  try {
    const candidateUrl = new URL(metadata.returnTo, frontendUrl);

    if (candidateUrl.origin !== frontendUrl.origin) {
      return safeFallbackPath;
    }

    return `${candidateUrl.pathname}${candidateUrl.search}${candidateUrl.hash}`;
  } catch (_error) {
    return safeFallbackPath;
  }
}

function buildFrontendRedirectUrl(
  status: "success" | "error",
  metadata?: OAuthRedirectMetadata,
  fallbackPath = "/",
  message?: string,
) {
  const redirectUrl = new URL(
    getSafeFrontendPath(metadata, fallbackPath),
    getFrontendBaseUrl(),
  );

  redirectUrl.searchParams.set("driveAuth", status);

  if (metadata?.autoExport) {
    redirectUrl.searchParams.set("autoExport", "drive");
  }

  return redirectUrl.toString();
}

/**
 * Refactored OAuth routes using new auth.service
 * Clean abstraction - works with any OAuth provider
 */
export default async function oauthRoutes(app: FastifyInstance) {
  const authService = getAuthService("google"); // Can switch to "jwt" or "onedrive" later
  const exportService = getExportService();
  const notificationHub = getNotificationHubService();

  /**
   * Generate OAuth authorization URL
   */
  app.post("/api/drive/auth-url", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { returnTo, viewerId, autoExport } = request.body as {
        returnTo?: string;
        viewerId?: string;
        autoExport?: boolean;
      };
      const state = randomUUID(); // State for CSRF protection

      // Generate auth URL
      const authUrl = authService.generateAuthUrl(state);

      // Store state in session for validation during callback
      (request.session as any).oauth_state = state;
      (request.session as any).oauth_metadata = {
        returnTo,
        viewerId,
        autoExport: autoExport === true,
      };
      await request.session.save?.();

      return reply.status(200).send({ authUrl });
    } catch (error) {
      return reply.status(500).send({ error: "Failed to generate auth URL" });
    }
  });

  /**
   * Handle OAuth callback from provider
   */
  app.get(
    "/api/drive/auth/callback",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { code, state, error } = request.query as {
          code?: string;
          state?: string;
          error?: string;
        };

        const session = request.session as any;
        const oauthMetadata = session.oauth_metadata as OAuthRedirectMetadata | undefined;
        const clearOAuthState = async () => {
          delete session.oauth_state;
          delete session.oauth_metadata;
          await session.save?.();
        };

        if (error) {
          await clearOAuthState();
          return reply.redirect(buildFrontendRedirectUrl("error", oauthMetadata, "/", error));
        }

        // Verify state matches
        if (state !== session.oauth_state) {
          await clearOAuthState();
          return reply.redirect(
            buildFrontendRedirectUrl("error", oauthMetadata, "/", "state_mismatch"),
          );
        }

        console.log(`Code to token: ${code}`);
        // Exchange code for tokens
        const result = await authService.handleOAuthCallback(request, code!);

        // Clear temporary state
        await clearOAuthState();

        return reply.redirect(
          buildFrontendRedirectUrl("success", oauthMetadata, result.redirectTo),
        );
      } catch (error) {
        console.error("OAuth callback error:", error);
        const session = request.session as any;
        const oauthMetadata = session.oauth_metadata as OAuthRedirectMetadata | undefined;

        delete session.oauth_state;
        delete session.oauth_metadata;
        await session.save?.();

        return reply.redirect(
          buildFrontendRedirectUrl("error", oauthMetadata, "/", "oauth_failed"),
        );
      }
    },
  );

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
  app.get("/api/auth/stream", async (request: FastifyRequest, reply: FastifyReply) => {
    // CORS headers
    const origin = request.headers.origin;
    const allowed = [process.env.FRONTEND_SERVER || "http://localhost:3000"];

    if (origin && allowed.includes(origin)) {
      reply.raw.setHeader("Access-Control-Allow-Origin", origin);
      reply.raw.setHeader("Access-Control-Allow-Credentials", "true");
    }

    // SSE headers
    reply.raw.setHeader("Content-Type", "text/event-stream");
    reply.raw.setHeader("Cache-Control", "no-cache");
    reply.raw.setHeader("Connection", "keep-alive");

    // Get scope for this session
    const scope = authService.getSessionScope(request);
    const clientId = randomUUID();
    const client = {
      id: clientId,
      write: (chunk: string) => reply.raw.write(chunk),
    };

    // Register client with notification hub
    notificationHub.addClient(scope, client);

    // Send initial auth status
    const status = await authService.getAuthStatus(request);
    client.write(`event: auth-status\ndata: ${JSON.stringify(status)}\n\n`);

    // Cleanup on disconnect
    request.raw.on("close", () => {
      notificationHub.removeClient(scope, client);
    });
  });

  /**
   * Logout and disconnect authentication
   */
  app.post("/api/auth/logout", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const disconnected = await authService.disconnect(request);

      if (!disconnected) {
        return reply.status(401).send({ error: "Not authenticated" });
      }

      return reply.send({ ok: true });
    } catch (error) {
      console.error("Logout error:", error);
      return reply.status(500).send({ error: "Failed to logout" });
    }
  });

  /**
   * Export file to cloud storage (Google Drive or other)
   */
  app.post("/api/export", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { fileBuffer, annotations, options } = request.body as any;

      if (!fileBuffer) {
        return reply.status(400).send({ error: "Missing fileBuffer" });
      }

      // Convert base64 to Buffer if needed
      const buffer = Buffer.from(fileBuffer, "base64");

      // Execute export
      const result = await exportService.exportToGoogleDrive(request, {
        fileBuffer: buffer,
        annotations,
        options,
      });

      return reply.send(result);
    } catch (error) {
      console.error("Export error:", error);
      return reply.status(500).send({
        error: error instanceof Error ? error.message : "Export failed",
      });
    }
  });
}
