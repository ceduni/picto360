import { FastifyReply, FastifyRequest } from "fastify";
import { AuthStatus, OAuthProviderType, OAuthCallbackResult } from "@/types/auth.types";
import { AuthProviderFactory } from "@/providers/auth/AuthProviderFactory";
import { AuthConfig } from "@/providers/auth/AuthConfig";
import { getNotificationHubService } from "./notificationHub.service";
import { IAuthProvider } from "@/providers/auth/BaseAuthProvider";
import { getExportService } from "./export.service";
import { randomUUID } from "crypto";

interface OAuthRedirectMetadata {
  returnTo?: string;
  viewerId?: string;
  autoExport?: boolean;
}

const frontend_server = process.env.FRONTEND_SERVER || "http://localhost:3000";


function getSafeFrontendPath(metadata?: OAuthRedirectMetadata, fallbackPath = "/") {
  const frontendUrl = new URL(frontend_server);
  const safeFallbackPath =   metadata?.viewerId ? `/view/${encodeURIComponent(metadata.viewerId)}` :  fallbackPath;

  if (! metadata?.returnTo) {
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
    frontend_server,
  );

  redirectUrl.searchParams.set("driveAuth", status);

  if (metadata?.autoExport) {
    redirectUrl.searchParams.set("autoExport", "drive");
  }

  return redirectUrl.toString();
}

/**
 * Unified auth service supporting multiple OAuth providers
 * Handles token management, refresh, and session persistence
 */
export class AuthService {
  private notificationHub = getNotificationHubService();
  private activeProvider: IAuthProvider;
  private providerType: OAuthProviderType;
  private exportService = getExportService();

  constructor(providerType: OAuthProviderType = "google") {
    this.providerType = providerType;

    // Initialize provider if not already done
    if (!AuthProviderFactory.hasProvider(providerType)) {
      const config = AuthConfig.getConfig(providerType);
      AuthProviderFactory.createProvider(providerType, config);
    }

    this.activeProvider = AuthProviderFactory.getProvider(providerType);
  }

  /**
   *
   * @param notificationHub
   */
  setNotificationHub(notificationHub: ReturnType<typeof getNotificationHubService>) {
    this.notificationHub = notificationHub;
  }

  /**
   * Generate OAuth URL for user
   */

  generateAuthUrl = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { returnTo, viewerId, autoExport } = request.body as {
        returnTo?: string;
        viewerId?: string;
        autoExport?: boolean;
      };
      const state = randomUUID(); // State for CSRF protection

      // Generate auth URL
      const authUrl = this.activeProvider.generateAuthUrl(state);

      // Store state in session for validation during callback
      (request.session as any).oauth_state = state;
      (request.session as any).oauth_metadata = {
        returnTo,
        viewerId,
        autoExport: autoExport === true,
      };
      await request.session.save?.();

      reply.status(200).send({ authUrl });
    } catch (error) {
      reply.status(500).send({ error: "Failed to generate auth URL" });
    }
  }



  /**
   * Exchange authorization code for tokens and save to session
   */
  handleOauthCallBack = async (request: FastifyRequest, reply: FastifyReply) => {
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

      // Exchange code for tokens
      const result = await this.exchangeCodeToToken(request, code!);

      // Clear temporary state
      await clearOAuthState();

      return reply.redirect(
        buildFrontendRedirectUrl("success", oauthMetadata, result.redirectTo),
      );
    } catch (error) {
      const session = request.session as any;
      const oauthMetadata = session.oauth_metadata as OAuthRedirectMetadata | undefined;

      delete session.oauth_state;
      delete session.oauth_metadata;
      await session.save?.();

      return reply.status(500).redirect(
        buildFrontendRedirectUrl("error", oauthMetadata, "/", "oauth_failed"),
      );
    }
  }

  async exchangeCodeToToken(req: FastifyRequest, code: string): Promise<OAuthCallbackResult> {
    try {
      const tokens = await this.activeProvider.getTokensFromCode(code);
      const userInfo = await this.activeProvider.getUserInfo(tokens.access_token);

      // Store in session
      const sessionKey = this.getSessionKey();
      (req.session)[sessionKey] = {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry: tokens.expiry_date ?? Date.now() + 3600 * 1000,
        provider: this.providerType,
        user_id: userInfo.uid,
      };

      await req.session.save?.();

      // Broadcast auth status
      this.notificationHub.emit(this.getSessionScope(req), "auth-status", {
        connected: true,
        expiry: tokens.expiry_date,
        provider: this.providerType,
        user: userInfo ? userInfo : undefined,
      });

      return {
        redirectTo: "/?auth=success",
        provider: this.providerType,
      };
    } catch (error) {
      throw new Error(`OAuth callback failed: ${error}`);
    }
  }

  /**
   * Ensure valid access token, refresh if needed
   */
  async ensureConnection(req: FastifyRequest): Promise<string> {
    const sessionKey = this.getSessionKey();
    const session = req.session;
    const connection = session[sessionKey];

    if (!connection) {
      throw new Error(`Not authenticated with ${this.providerType}`);
    }

    // Token is still valid
    if (connection.expiry && Date.now() < connection.expiry - 10_000) {
      return connection.access_token;
    }

    // Token expired or expiring, try to refresh
    if (!connection.refresh_token) {
      throw new Error(`No refresh token available for ${this.providerType}`);
    }

    try {
      const newTokens = await this.activeProvider.refreshAccessToken(connection.refresh_token);

      // Update session with new tokens
      session[sessionKey] = {
        ...connection,
        access_token: newTokens.access_token,
        refresh_token: newTokens.refresh_token ,
        expiry: newTokens.expiry_date ?? Date.now() + 3600 * 1000,
      };

      await req.session.save?.();

      // Broadcast refresh success
      this.notificationHub.emit(this.getSessionScope(req), "auth-status", {
        connected: true,
        provider: this.providerType,
        refreshed: true,
      });

      return newTokens.access_token;
    } catch (error) {
      // Refresh failed, clear session
      delete session[sessionKey];
      await req.session.save?.();

      this.notificationHub.emit(this.getSessionScope(req), "auth-status", {
        connected: false,
        provider: this.providerType,
        reason: "token_refresh_failed",
      });

      throw new Error(`Failed to refresh token: ${error}`);
    }
  }

  /**
   * Get current auth status
   */
  async getAuthStatus(req: FastifyRequest): Promise<AuthStatus> {
    const sessionKey = this.getSessionKey();
    const session = req.session;
    const connection = session[sessionKey];

    if (!connection) {
      return {
        isAuthenticated: false,
        provider: this.providerType,
        scopes: this.activeProvider.scopes,
      };
    }

    try {
      // Try to ensure token is valid (will refresh if needed)
      await this.ensureConnection(req);

      if(!connection.user_id){
        return {
          isAuthenticated: false,
          provider: this.providerType,
          scopes: this.activeProvider.scopes,
        };
      }

      const userInfo = await this.activeProvider.getUserInfo(connection.access_token);

      return {
        isAuthenticated: true,
        provider: this.providerType,
        scopes: this.activeProvider.scopes,
        expiresAt: connection.expiry,
        connectedAt: new Date().toISOString(),
        user: userInfo,
      };
    } catch (error) {
      return {
        isAuthenticated: false,
        provider: this.providerType,
        scopes: this.activeProvider.scopes,
      };
    }
  }

  /**
   * Revoke token and clear session
   */
  async disconnect(req: FastifyRequest): Promise<boolean> {
    const sessionKey = this.getSessionKey();
    const session = req.session ;
    const connection = session[sessionKey];

    if (!connection) {
      return false;
    }

    try {
      // Revoke the token with the provider
      await this.activeProvider.revokeToken(connection.access_token);
    } catch (error) {
      console.warn(`Warning: Failed to revoke token with provider: ${error}`);
      // Continue anyway to clear local session
    }

    // Clear session
    delete session[sessionKey];
    await req.session.save?.();

    // Broadcast disconnection
    this.notificationHub.emit(this.getSessionScope(req), "auth-status", {
      connected: false,
      provider: this.providerType,
    });

    return true;
  }

  /**
   * Get the session key for this provider
   */
  private getSessionKey(): string {
    return `auth_${this.providerType}`;
  }

  /**
   * Get notification scope for this session
   */
  getSessionScope(req: FastifyRequest): string {
    return `user-${req.session.notificationScope}`;
  }

  /**
   * Get active provider type
   */
  getProvider(): OAuthProviderType {
    return this.providerType;
  }

  /**
   * Start an sse stream to transfer updates to the front-end 
   */
  startSSEstream = async (request: FastifyRequest, reply: FastifyReply) => {
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
    const scope = this.getSessionScope(request);
    const clientId = randomUUID();
    const client = {
      id: clientId,
      write: (chunk: string) => reply.raw.write(chunk),
    };

    // Register client with notification hub
    this.notificationHub.addClient(scope, client);

    // Send initial auth status
    const status = await this.getAuthStatus(request);
    client.write(`event: auth-status\ndata: ${JSON.stringify(status)}\n\n`);

    // Cleanup on disconnect
    request.raw.on("close", () => {
      this.notificationHub.removeClient(scope, client);
    });
  }

}

// Singleton cache for auth service instances
const authServiceCache = new Map<OAuthProviderType, AuthService>();

/**
 * Get or create AuthService singleton for a specific provider
 */
export function getAuthService(providerType: OAuthProviderType = "google"): AuthService {
  if (!authServiceCache.has(providerType)) {
    authServiceCache.set(providerType, new AuthService(providerType));
  }
  return authServiceCache.get(providerType)!;
}
