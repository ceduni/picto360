import { IAuthProvider, AuthProviderConfig, OAuthProviderType } from "@/types/auth.types";
import { GoogleAuthProvider } from "./GoogleAuthProvider";
import { JWTAuthProvider } from "./JWTAuthProvider";
import { OnedriveAuthProvider } from "./OnedriveAuthProvider";

/**
 * Factory for creating auth provider instances
 */
export class AuthProviderFactory {
  private static providers: Map<OAuthProviderType, IAuthProvider> = new Map();

  /**
   * Create or retrieve cached provider instance
   */
  static createProvider(type: OAuthProviderType, config: AuthProviderConfig): IAuthProvider {
    // Return cached instance if available
    if (this.providers.has(type)) {
      return this.providers.get(type)!;
    }

    let provider: IAuthProvider;

    switch (type) {
      case "google":
        provider = new GoogleAuthProvider(config);
        break;
      case "jwt":
        provider = new JWTAuthProvider(config);
        break;
      case "onedrive":
        provider = new OnedriveAuthProvider(config);
        break;
      default:
        throw new Error(`Unknown auth provider type: ${type}`);
    }

    // Cache for reuse
    this.providers.set(type, provider);
    return provider;
  }

  /**
   * Get cached provider or throw error
   */
  static getProvider(type: OAuthProviderType): IAuthProvider {
    const provider = this.providers.get(type);
    if (!provider) {
      throw new Error(`Auth provider '${type}' has not been initialized. Call createProvider first.`);
    }
    return provider;
  }

  /**
   * Check if provider is initialized
   */
  static hasProvider(type: OAuthProviderType): boolean {
    return this.providers.has(type);
  }

  /**
   * Clear cached provider (useful for testing)
   */
  static clearProvider(type: OAuthProviderType): void {
    this.providers.delete(type);
  }

  /**
   * Clear all providers
   */
  static clearAll(): void {
    this.providers.clear();
  }
}
