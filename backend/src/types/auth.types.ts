import { FastifyRequest } from "fastify";

/**
 * Auth token information
 */
export interface AuthToken {
  access_token: string;
  refresh_token?: string;
  expiry_date?: number;
  token_type?: string;
}

export type AuthUserInfo = {
  uid?: string;
  email?: string;
  displayName?: string;
  providerId: string;
  toJSON?: () => { uid: string; email?: string; displayName?: string; providerId: string };
};

/**
 * OAuth provider type discriminator
 */
export type OAuthProviderType = "google" | "jwt" | "onedrive";

/**
 * Base authentication status
 */
export interface AuthStatus {
  isAuthenticated: boolean;
  provider: OAuthProviderType;
  scopes: string[];
  expiresAt?: number;
  connectedAt?: string;
  user?: AuthUserInfo;
}

/**
 * OAuth callback result after code exchange
 */
export interface OAuthCallbackResult {
  redirectTo: string;
  provider: OAuthProviderType;
}

/**
 * Session connection info stored in Fastify session
 */
export interface SessionConnection {
  access_token: string;
  refresh_token?: string;
  expiry: number;
  provider: OAuthProviderType;
  user_id?: string;
}

/**
 * Environment configuration for auth providers
 */
export interface AuthProviderConfig {
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
  secret?: string; // For JWT
  refreshTokenSecret?: string;
}

/**
 * OAuth provider interface - all implementations must follow this contract
 */
export interface IAuthProvider {
  get provider(): OAuthProviderType;
  get scopes(): string[];

  /**
   * Generate auth URL for user to visit
   */
  generateAuthUrl(state: string): string;

  /**
   * Exchange authorization code for tokens
   */
  getTokensFromCode(code: string): Promise<AuthToken>;

  /**
   * Refresh access token using refresh token
   */
  refreshAccessToken(refreshToken: string): Promise<AuthToken>;

  /**
   * Verify and get current token validity
   */
  verifyToken(token: AuthToken): Promise<boolean>;

  /**
   * Revoke token and cleanup
   */
  revokeToken(token: string): Promise<void>;

  /**
   * Get user info from provider
   */
  getUserInfo(accessToken: string): Promise<AuthUserInfo>;

  /**
   * Set auth client with credentials
   */
  setCredentials(token: AuthToken): void;
}

/**
 * Auth service configuration
 */
export interface AuthServiceConfig {
  enabledProviders: OAuthProviderType[];
  defaultProvider: OAuthProviderType;
}
