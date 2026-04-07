import { AuthProviderConfig, OAuthProviderType } from "@/types/auth.types";
import "@/config/env";
/**
 * Load and validate auth provider configuration from environment variables
 */
export class AuthConfig {
  /**
   * Load Google OAuth config
   */
  static getGoogleConfig(): AuthProviderConfig {
    const config: AuthProviderConfig = {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
    };

    this.validateRequired(config, ["clientId", "clientSecret", "redirectUri"], "Google");
    return config;
  }

  /**
   * Load JWT config
   */
  static getJWTConfig(): AuthProviderConfig {
    const config: AuthProviderConfig = {
      secret: process.env.JWT_SECRET,
      refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
    };

    this.validateRequired(config, ["secret"], "JWT");
    return config;
  }

  /**
   * Load OneDrive OAuth config
   */
  static getOnedriveConfig(): AuthProviderConfig {
    const config: AuthProviderConfig = {
      clientId: process.env.ONEDRIVE_CLIENT_ID,
      clientSecret: process.env.ONEDRIVE_CLIENT_SECRET,
      redirectUri: process.env.ONEDRIVE_REDIRECT_URI,
    };

    this.validateRequired(config, ["clientId", "clientSecret", "redirectUri"], "OneDrive");
    return config;
  }

  /**
   * Load config for any provider type
   */
  static getConfig(provider: OAuthProviderType): AuthProviderConfig {
    switch (provider) {
      case "google":
        return this.getGoogleConfig();
      case "jwt":
        return this.getJWTConfig();
      case "onedrive":
        return this.getOnedriveConfig();
      default:
        throw new Error(`Unknown provider type: ${provider}`);
    }
  }

  /**
   * Validate that all required keys are present and non-empty
   */
  private static validateRequired(
    config: AuthProviderConfig,
    requiredKeys: (keyof AuthProviderConfig)[],
    providerName: string,
  ): void {
    const missing = requiredKeys.filter((key) => !config[key]);

    if (missing.length > 0) {
      throw new Error(
        `${providerName} auth configuration incomplete. Missing: ${missing.join(", ")}. ` +
        `Set environment variables: ${missing.map((k) => `${k.toString().toUpperCase()}`).join(", ")}`+
        ` (here is your config: ${JSON.stringify(config)})` + "\n" +
        ` (here is what .env returns: ${process.env.GOOGLE_CLIENT_ID}, ${process.env.GOOGLE_CLIENT_SECRET}, ${process.env.GOOGLE_REDIRECT_URI})`,

      );
    }
  }
}
