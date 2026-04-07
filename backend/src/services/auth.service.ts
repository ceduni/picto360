import { FastifyRequest } from "fastify";
import { IAuthProvider, AuthStatus, SessionConnection, OAuthProviderType, OAuthCallbackResult } from "@/types/auth.types";
import { AuthProviderFactory } from "@/providers/auth/AuthProviderFactory";
import { AuthConfig } from "@/providers/auth/AuthConfig";
import { getNotificationHubService } from "./notificationHub.service";


/**
 * Unified auth service supporting multiple OAuth providers
 * Handles token management, refresh, and session persistence
 */
export class AuthService {
  private notificationHub = getNotificationHubService();
  private activeProvider: IAuthProvider;
  private providerType: OAuthProviderType;

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
  generateAuthUrl(state: string): string {
    return this.activeProvider.generateAuthUrl(state);
  }

  /**
   * Exchange authorization code for tokens and save to session
   */
  async handleOAuthCallback(req: FastifyRequest, code: string): Promise<OAuthCallbackResult> {
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
        refresh_token: newTokens.refresh_token || connection.refresh_token,
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
