import { BaseAuthProvider } from "./BaseAuthProvider";
import { AuthToken, OAuthProviderType, AuthProviderConfig, AuthUserInfo } from "@/types/auth.types";

/**
 * OneDrive OAuth provider (stub for future implementation)
 *
 * When implementing:
 * 1. Install @azure/identity or msal-node
 * 2. Use Microsoft Graph API (https://graph.microsoft.com)
 * 3. Similar flow to Google but with Azure AD endpoints
 *
 * Reference:
 * - https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app
 * - https://github.com/Azure-Samples/ms-identity-javascript-oauth-code-flow
 */
export class OnedriveAuthProvider extends BaseAuthProvider {
  private readonly SCOPES = ["https://graph.microsoft.com/.default"];

  constructor(config: AuthProviderConfig) {
    super(config);
  }

  protected validateConfig(): void {
    super.validateConfig();
    const { clientId, clientSecret, redirectUri } = this.config;
    if (!clientId || !clientSecret || !redirectUri) {
      throw new Error("OnedriveAuthProvider: Missing required config (clientId, clientSecret, redirectUri)");
    }
  }

  get provider(): OAuthProviderType {
    return "onedrive";
  }

  get scopes(): string[] {
    return this.SCOPES;
  }

  generateAuthUrl(state: string): string {
    // TODO: Implement OneDrive auth URL generation
    // Example: https://login.microsoftonline.com/common/oauth2/v2.0/authorize
    throw new Error("OnedriveAuthProvider: Not yet implemented");
  }

  async getTokensFromCode(code: string): Promise<AuthToken> {
    // TODO: Implement token exchange with Microsoft Graph
    throw new Error("OnedriveAuthProvider: Not yet implemented");
  }

  async refreshAccessToken(refreshToken: string): Promise<AuthToken> {
    // TODO: Implement token refresh
    throw new Error("OnedriveAuthProvider: Not yet implemented");
  }

  async verifyToken(token: AuthToken): Promise<boolean> {
    // TODO: Implement token verification
    throw new Error("OnedriveAuthProvider: Not yet implemented");
  }

  async revokeToken(token: string): Promise<void> {
    // TODO: Implement token revocation
    throw new Error("OnedriveAuthProvider: Not yet implemented");
  }

  async getUserInfo(accessToken: string): Promise<AuthUserInfo> {
    // TODO: Implement user info retrieval from Microsoft Graph
    throw new Error("OnedriveAuthProvider: Not yet implemented");
  }

  setCredentials(token: AuthToken): void {
    // TODO: Implement credentials setup
    throw new Error("OnedriveAuthProvider: Not yet implemented");
  }
}
