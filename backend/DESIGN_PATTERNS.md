# Design Patterns & Best Practices

This refactoring leverages industry-standard design patterns to maximize scalability and maintainability.

## 1. Strategy Pattern (OAuth Providers)

**Problem:** Different OAuth providers have different implementations but same interface.

**Solution:** Implement a common interface with different strategies.

```typescript
// The Strategy Interface
export interface IAuthProvider {
  generateAuthUrl(state: string): string;
  getTokensFromCode(code: string): Promise<AuthToken>;
  refreshAccessToken(refreshToken: string): Promise<AuthToken>;
  verifyToken(token: AuthToken): Promise<boolean>;
  revokeToken(token: string): Promise<void>;
  getUserInfo(accessToken: string): Promise<{ id: string; email?: string; name?: string }>;
  setCredentials(token: AuthToken): void;
}

// Different Strategies
class GoogleAuthProvider implements IAuthProvider { ... }
class JWTAuthProvider implements IAuthProvider { ... }
class OnedriveAuthProvider implements IAuthProvider { ... }

// Use any strategy interchangeably
const authService = new AuthService(selectedProvider);
await authService.handleOAuthCallback(req, code); // Works regardless of provider
```

**Benefits:**
- ✅ Add new providers without modifying existing code
- ✅ Test each strategy independently
- ✅ Runtime provider selection
- ✅ Follows Open/Closed Principle (open for extension, closed for modification)

---

## 2. Factory Pattern (Provider Instantiation)

**Problem:** Need to instantiate correct provider based on type.

**Solution:** Use factory to encapsulate creation logic.

```typescript
// Factory centralizes instantiation
export class AuthProviderFactory {
  static createProvider(type: OAuthProviderType, config: AuthProviderConfig): IAuthProvider {
    switch (type) {
      case "google":
        return new GoogleAuthProvider(config);
      case "jwt":
        return new JWTAuthProvider(config);
      case "onedrive":
        return new OnedriveAuthProvider(config);
      default:
        throw new Error(`Unknown provider: ${type}`);
    }
  }
}

// Usage: Client doesn't care about creation details
const provider = AuthProviderFactory.createProvider("google", googleConfig);
```

**Benefits:**
- ✅ Centralized configuration management
- ✅ Easy to add providers (modify factory, add new class)
- ✅ Caching support (same provider reused)
- ✅ Dependency injection point

---

## 3. Template Method Pattern (Base Classes)

**Problem:** Auth providers share common logic (validation, token checks) but differ in implementation.

**Solution:** Abstract base class with template methods.

```typescript
// Base class defines structure
export abstract class BaseAuthProvider implements IAuthProvider {
  protected config: AuthProviderConfig;

  constructor(config: AuthProviderConfig) {
    this.config = config;
    this.validateConfig(); // Template method call
  }

  protected validateConfig(): void {
    // Generic validation - implemented in base
    if (!this.config) throw new Error("Config required");
  }

  // Helper methods available to all subclasses
  protected isTokenValid(token: AuthToken): boolean {
    return !token.expiry_date || Date.now() < token.expiry_date - 10_000;
  }

  // Abstract methods - each provider implements
  abstract generateAuthUrl(state: string): string;
  abstract getTokensFromCode(code: string): Promise<AuthToken>;
}

// Specific implementation
class GoogleAuthProvider extends BaseAuthProvider {
  protected validateConfig(): void {
    super.validateConfig();
    // Add Google-specific validation
    if (!this.config.clientId) throw new Error("Missing clientId");
  }

  generateAuthUrl(state: string): string { ... }
  getTokensFromCode(code: string): Promise<AuthToken> { ... }
}
```

**Benefits:**
- ✅ Reduces code duplication
- ✅ Enforces contract through abstract methods
- ✅ Customization points (hook methods)
- ✅ Consistent error messages across providers

---

## 4. Adapter Pattern (Storage Backend Swapping)

**Problem:** Different cloud storage services have different APIs.

**Solution:** Adapter interface normalizes different APIs.

```typescript
// Adapter Interface (defines the contract)
export interface IStorageProvider {
  createFolder(name: string, parentId?: string): Promise<string>;
  uploadFile(fileBuffer: Buffer, metadata: StorageFileMetadata, folderId: string): Promise<{ id: string; name: string }>;
  deleteFile(fileId: string): Promise<void>;
  getFolderShareUrl(folderId: string): Promise<string>;
}

// Adapter 1: Google Drive
class GoogleDriveStorageProvider implements IStorageProvider {
  async createFolder(name: string, parentId?: string): Promise<string> {
    const folderMetadata = {
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: parentId ? [parentId] : undefined,
    };
    // Google Drive API call
  }
}

// Adapter 2: S3 (future)
class S3StorageProvider implements IStorageProvider {
  async createFolder(name: string, parentId?: string): Promise<string> {
    // S3 doesn't have folders, but we can use prefix convention
    // S3 API call
  }
}

// Usage: No changes needed when switching storage
const storage: IStorageProvider = provider === "s3"
  ? new S3StorageProvider(config)
  : new GoogleDriveStorageProvider(oauth2Client);

await storage.createFolder("My Folder");
```

**Benefits:**
- ✅ Swap storage backends without changing export logic
- ✅ Different APIs hidden behind common interface
- ✅ Easy to test with mock implementations
- ✅ Supports multi-cloud deployments

---

## 5. Dependency Injection Pattern

**Problem:** Services depend on many other services, creating tight coupling.

**Solution:** Inject dependencies rather than creating them.

```typescript
// Without DI: Hard to test, tightly coupled
class ExportService {
  constructor() {
    this.authService = getAuthService("google"); // Creates dependency
    this.storage = new GoogleDriveStorageProvider(); // Hard-coded
    this.notificationHub = getNotificationHubService(); // Can't substitute
  }

  async export(req, input) {
    // Uses whatever was created in constructor
  }
}

// With DI: Flexible, testable, decoupled
class ExportService {
  constructor(
    private authService: IAuthService,
    private storage: IStorageProvider,
    private notificationHub: NotificationHub,
  ) {}

  async export(req, input) {
    // Can use any implementation passed in
  }
}

// In tests: Easy to substitute
const mockAuth = { ensureValidAccessToken: jest.fn() };
const mockStorage = { uploadFile: jest.fn() };
const service = new ExportService(mockAuth, mockStorage, notificationHub);
```

**Benefits:**
- ✅ Highly testable (mock any dependency)
- ✅ Loose coupling (services don't know about implementations)
- ✅ Easy to swap implementations
- ✅ Centralized dependency configuration

---

## 6. Factory Pattern (Export Formatters)

**Problem:** Need to format exports in different ways (raw, picto, custom).

**Solution:** Formatter factory encapsulates formatter creation.

```typescript
// Formatter Interface
export interface IExportFormatter {
  export(
    fileBuffer: Buffer,
    annotations: HotspotData[],
    options: ExportOptions,
    storage: IStorageProvider,
    folderId: string,
  ): Promise<Partial<ExportResult>>;
}

// Concrete Formatters
class RawFormatExporter extends BaseExportFormatter { ... }
class PictoFormatExporter extends BaseExportFormatter { ... }

// Factory
export class ExportFormatterFactory {
  private static formatters: Map<ExportFormat, IExportFormatter> = new Map();

  static getFormatter(format: ExportFormat): IExportFormatter {
    if (!this.formatters.has(format)) {
      // Create and cache
      switch (format) {
        case "raw":
          this.formatters.set(format, new RawFormatExporter());
          break;
        case "picto":
          this.formatters.set(format, new PictoFormatExporter());
          break;
      }
    }
    return this.formatters.get(format)!;
  }
}

// Usage
const formatter = ExportFormatterFactory.getFormatter(input.options.format);
await formatter.export(buffer, annotations, options, storage, folderId);
```

**Benefits:**
- ✅ Add export formats without modifying export service
- ✅ Lazy loading and caching of formatters
- ✅ Single responsibility (each formatter focusedprefetchon one format)
- ✅ Easy to test individual formatters

---

## 7. Singleton Pattern (Services)

**Problem:** Want single instance of service throughout application.

**Solution:** Lazy-load singleton.

```typescript
// Service: Created once, reused everywhere
let authServiceInstance: AuthService | null = null;

export function getAuthService(providerType: OAuthProviderType = "google"): AuthService {
  if (!authServiceInstance) {
    authServiceInstance = new AuthService(providerType);
  }
  return authServiceInstance;
}

// Usage everywhere
const service1 = getAuthService("google");
const service2 = getAuthService("google");
console.log(service1 === service2); // true - same instance
```

**Benefits:**
- ✅ Memory efficient (one instance per provider)
- ✅ Consistent state throughout application
- ✅ Lazy initialization (only when needed)
- ✅ Easy to reset in tests

---

## 8. Configuration Management (Environment Validation)

**Problem:** Scattered env variable access, no validation.

**Solution:** Centralized config with validation.

```typescript
// Config loader with validation
export class AuthConfig {
  static getGoogleConfig(): AuthProviderConfig {
    const config: AuthProviderConfig = {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
    };

    // Validate required values
    this.validateRequired(config, ["clientId", "clientSecret", "redirectUri"], "Google");
    return config;
  }

  private static validateRequired(
    config: AuthProviderConfig,
    requiredKeys: (keyof AuthProviderConfig)[],
    providerName: string,
  ): void {
    const missing = requiredKeys.filter((key) => !config[key]);

    if (missing.length > 0) {
      throw new Error(
        `${providerName} auth configuration incomplete. Missing: ${missing.join(", ")}`,
      );
    }
  }
}

// Fail fast on startup, not at runtime
AuthProviderFactory.createProvider("google", AuthConfig.getGoogleConfig());
```

**Benefits:**
- ✅ Validation at startup (fail fast)
- ✅ Clear error messages for misconfiguration
- ✅ Centralized config logic
- ✅ Easy to add new providers with theit own validation

---

## 9. Error Handling Best Practices

**Problem:** Scattered error handling with unclear context.

**Solution:** Structured error handling with provider context.

```typescript
// Each provider adds context to errors
class GoogleAuthProvider extends BaseAuthProvider {
  async getTokensFromCode(code: string): Promise<AuthToken> {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      return { /* ... */ };
    } catch (error) {
      // Add provider context
      throw new Error(`GoogleAuthProvider: Failed to exchange code: ${error.message}`);
    }
  }
}

// Service can log with full context
class AuthService {
  async handleOAuthCallback(req: FastifyRequest, code: string) {
    try {
      const tokens = await this.activeProvider.getTokensFromCode(code);
      // ... success path
    } catch (error) {
      // Error already has provider info
      console.error(`Auth setup failed for ${this.providerType}:`, error.message);
      throw error;
    }
  }
}
```

**Benefits:**
- ✅ Clear error origins (which provider failed?)
- ✅ Easier debugging and logging
- ✅ Better error messages for clients
- ✅ Consistent error format across providers

---

## SOLID Principles Adherence

### Single Responsibility Principle (SRP)
- ✅ `GoogleAuthProvider`: Only Google OAuth logic
- ✅ `GoogleDriveStorageProvider`: Only Google Drive storage
- ✅ `RawFormatExporter`: Only raw format export
- ✅ `AuthService`: Only auth orchestration
- ✅ `ExportService`: Only export orchestration

### Open/Closed Principle (OCP)
- ✅ Open for extension: Add new providers without modifying existing code
- ✅ Closed for modification: Existing providers unchanged when adding new ones

### Liskov Substitution Principle (LSP)
- ✅ All `IAuthProvider` implementations are substitutable
- ✅ All `IStorageProvider` implementations are substitutable
- ✅ All `IExportFormatter` implementations are substitutable

### Interface Segregation Principle (ISP)
- ✅ `IAuthProvider`: Only auth-related methods
- ✅ `IStorageProvider`: Only storage-related methods
- ✅ `IExportFormatter`: Only export-related methods
- ✅ Clients depend on small, focused interfaces

### Dependency Inversion Principle (DIP)
- ✅ Services depend on abstractions (`IAuthProvider`, `IStorageProvider`)
- ✅ Not on concrete implementations (`GoogleAuthProvider`, `S3StorageProvider`)
- ✅ Easy to swap implementations

---

## Conclusion

This architecture:
- 🎯 **Scales easily** with new providers and formats
- 🧪 **Tests thoroughly** with isolated unit tests
- 🔧 **Maintains cleanly** with clear separation of concerns
- 📖 **Reads clearly** with intent-revealing names and single responsibility
- 🚀 **Deploys safely** with backward compatibility and gradual migration

Industry-standard patterns make the codebase familiar to any experienced developer.
