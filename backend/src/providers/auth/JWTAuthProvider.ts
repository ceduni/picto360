import { BaseAuthProvider } from "./BaseAuthProvider";
import { AuthToken, OAuthProviderType, AuthProviderConfig, AuthUserInfo } from "@/types/auth.types";
import jwt, { SignOptions } from "jsonwebtoken";

/**
 * JWT (JSON Web Token) authentication provider
 * Useful for stateless, distributed auth scenarios
 */
export class JWTAuthProvider extends BaseAuthProvider {
  private readonly SCOPES = ["api"];

  constructor(config: AuthProviderConfig) {
    super(config);
  }

  protected validateConfig(): void {
    super.validateConfig();
    if (!this.config.secret) {
      throw new Error("JWTAuthProvider: Missing required config (secret)");
    }
  }

  get provider(): OAuthProviderType {
    return "jwt";
  }

  get scopes(): string[] {
    return this.SCOPES;
  }

  generateAuthUrl(state: string): string {
    throw new Error("JWTAuthProvider: generateAuthUrl not applicable for JWT. Use direct token generation instead.");
  }

  async getTokensFromCode(code: string): Promise<AuthToken> {
    throw new Error("JWTAuthProvider: getTokensFromCode not applicable for JWT. Use verifyToken instead.");
  }

  async refreshAccessToken(refreshToken: string): Promise<AuthToken> {
    try {
      const decoded = jwt.verify(refreshToken, this.config.secret!) as { sub: string };
      const newToken = jwt.sign({ sub: decoded.sub }, this.config.secret!, {
        expiresIn: "1h",
      });

      return {
        access_token: newToken,
        refresh_token: refreshToken,
        expiry_date: Date.now() + 3600 * 1000,
      };
    } catch (error) {
      throw new Error(`JWTAuthProvider: Failed to refresh token: ${error}`);
    }
  }

  async verifyToken(token: AuthToken): Promise<boolean> {
    try {
      jwt.verify(token.access_token, this.config.secret!);
      return true;
    } catch (error) {
      return false;
    }
  }

  async revokeToken(token: string): Promise<void> {
    // JWT tokens are self-contained and stateless
    // Revocation typically done via token blacklist or expiry
    // Implementation depends on your specific use case
  }

  async getUserInfo(accessToken: string): Promise<AuthUserInfo> {
    try {
      const decoded = jwt.verify(accessToken, this.config.secret!) as {
        sub: string;
        email?: string;
        name?: string;
      };
      return {
        uid: decoded.sub,
        email: decoded.email,
        displayName: decoded.name,
        providerId: this.provider,
      };
    } catch (error) {
      throw new Error(`JWTAuthProvider: Failed to get user info from token: ${error}`);
    }
  }

  setCredentials(token: AuthToken): void {
    // JWT is stateless, no state to maintain
  }

  /**
   * Generate a new JWT token (specific to JWT provider)
   */
  generateToken(payload: Record<string, any>, expiresIn: SignOptions["expiresIn"] = "1h"): string {
    const secret = this.config.secret;
    if (!secret) {
      throw new Error("JWTAuthProvider: Missing secret for token generation");
    }
    const options: SignOptions = { expiresIn };
    return jwt.sign(payload, secret, options);
  }
}
