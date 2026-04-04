import { BaseAuthProvider } from "./BaseAuthProvider";
import { AuthToken, OAuthProviderType, AuthProviderConfig, AuthUserInfo } from "@/types/auth.types";
import { Auth, google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

export class GoogleAuthProvider extends BaseAuthProvider {
  private oauth2Client: OAuth2Client;
  private readonly SCOPES = ["https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"];

  constructor(config: AuthProviderConfig) {
    super(config);
    this.oauth2Client = new google.auth.OAuth2(
      config.clientId,
      config.clientSecret,
      config.redirectUri,
    );
  }

  protected validateConfig(): void {
    super.validateConfig();
    const { clientId, clientSecret, redirectUri } = this.config;
    if (!clientId || !clientSecret || !redirectUri) {
      throw new Error("GoogleAuthProvider: Missing required config (clientId, clientSecret, redirectUri)");
    }
  }

  get provider(): OAuthProviderType {
    return "google";
  }

  get scopes(): string[] {
    return this.SCOPES;
  }

  generateAuthUrl(state: string): string {
    return this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: this.SCOPES,
      prompt: "consent",
      state,
    });
  }

  async getTokensFromCode(code: string): Promise<AuthToken> {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokens);

      return {
        access_token: tokens.access_token!,
        refresh_token: tokens.refresh_token ?? undefined,
        expiry_date: tokens.expiry_date || undefined,
        token_type: tokens.token_type ?? undefined,
      };
    } catch (error) {
      throw new Error(`GoogleAuthProvider: Failed to exchange code for tokens: ${error}`);
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<AuthToken> {
    try {
      const oauth = new google.auth.OAuth2(
        this.config.clientId,
        this.config.clientSecret,
        this.config.redirectUri,
      );

      oauth.setCredentials({ refresh_token: refreshToken });
      const { credentials } = await oauth.refreshAccessToken();

      return {
        access_token: credentials.access_token!,
        refresh_token: refreshToken, // Keep original refresh token
        expiry_date: credentials.expiry_date || undefined,
        token_type: credentials.token_type ?? undefined,
      };
    } catch (error) {
      throw new Error(`GoogleAuthProvider: Failed to refresh access token: ${error}`);
    }
  }

  async verifyToken(token: AuthToken): Promise<boolean> {
    try {
      // Set credentials to verify with Google API
      this.oauth2Client.setCredentials({ access_token: token.access_token });

      // Call tokeninfo endpoint to validate access token
      const response = await fetch("https://www.googleapis.com/oauth2/v1/tokeninfo", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ access_token: token.access_token }),
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async revokeToken(token: string): Promise<void> {
    try {
      await fetch("https://oauth2.googleapis.com/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ token }),
      });
    } catch (error) {
      throw new Error(`GoogleAuthProvider: Failed to revoke token: ${error}`);
    }
  }

  async getUserInfo(accessToken: string): Promise<AuthUserInfo> {
    try {
        this.oauth2Client.setCredentials({ access_token: accessToken });
        const oauth2 = google.oauth2({ version: "v2", auth: this.oauth2Client });
        const userInfo = await oauth2.userinfo.get();


        return {
            uid: userInfo.data.id || "",
            email: userInfo.data.email ?? undefined,
            displayName: userInfo.data.name ?? undefined,
            providerId: "google.com",
        };
    } catch (error) {
      throw new Error(`GoogleAuthProvider: Failed to get user info: ${error}`);
    }
  }

  setCredentials(token: AuthToken): void {
    this.oauth2Client.setCredentials({
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expiry_date: token.expiry_date,
    });
  }
}
