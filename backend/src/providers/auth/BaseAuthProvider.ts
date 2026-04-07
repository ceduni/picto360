import { IAuthProvider, AuthToken, OAuthProviderType, AuthProviderConfig, AuthUserInfo } from "@/types/auth.types";

/**
 * Abstract base class for OAuth providers
 * All OAuth implementations should extend this
 */
export abstract class BaseAuthProvider implements IAuthProvider {
  protected config: AuthProviderConfig;

  constructor(config: AuthProviderConfig) {
    this.config = config;
    this.validateConfig();
  }

  /**
   * Validate that required config is present
   * Override in subclasses for provider-specific validation
   */
  protected validateConfig(): void {
    if (!this.config) {
      throw new Error("Auth provider configuration is required");
    }
  }

  abstract get provider(): OAuthProviderType;
  abstract get scopes(): string[];

  abstract generateAuthUrl(state: string): string;
  abstract getTokensFromCode(code: string): Promise<AuthToken>;
  abstract refreshAccessToken(refreshToken: string): Promise<AuthToken>;
  abstract verifyToken(token: AuthToken): Promise<boolean>;
  abstract revokeToken(token: string): Promise<void>;
  abstract getUserInfo(accessToken: string): Promise<AuthUserInfo>;
  abstract setCredentials(token: AuthToken): void;

  /**
   * Check if token is still valid
   */
  protected isTokenValid(token: AuthToken): boolean {
    if (!token.access_token) return false;
    if (!token.expiry_date) return true; // No expiry set
    return Date.now() < token.expiry_date - 10_000; // 10s buffer
  }

  /**
   * Check if token is close to expiry
   */
  protected isTokenExpiringSoon(token: AuthToken, bufferMs: number = 10_000): boolean {
    if (!token.expiry_date) return false;
    return Date.now() >= token.expiry_date - bufferMs;
  }
}
