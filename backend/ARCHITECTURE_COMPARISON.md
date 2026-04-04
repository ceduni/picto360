# Old vs. New Architecture Comparison

## Monolithic Service vs. Layered Architecture

### BEFORE: Everything in One Service

**File: `oauthConnexion.service.ts` + `googleDrive.service.ts` + `export.service.ts`**

```typescript
// OLD: Mixed concerns
class GoogleDriveService {
  // OAuth methods
  generateAuthUrl() { ... }
  getTokensFromCode() { ... }
  refreshAccessToken() { ... }

  // File upload methods
  async uploadFile(fileBuffer, folderId, metadata) { ... }
  async createFolder(name) { ... }

  // Export orchestration
  async exportToGoogleDrive(fileBuffer, annotations) { ... }

  // Notifications
  broadcast = (event, data) => { ... }

  // Private utilities
  private ensureAccessToken() { ... }
  private revokeGoogleToken() { ... }
}

// Usage: Everything flows through one service
const service = getGoogleDriveService();
const token = await service.getTokensFromCode(code);
await service.createFolder("My Folder");
const result = await service.exportToGoogleDrive(buffer, annotations);
```

**Problems with monolithic approach:**
- ❌ Can't use Google auth without exporting
- ❌ Can't use another OAuth provider without duplicating all export logic
- ❌ Can't swap storage backends (Google Drive → S3)
- ❌ 300+ lines in one file mixing concerns
- ❌ Hard to test - must mock everything
- ❌ No type safety for provider types

---

## AFTER: Separated Concerns with Providers

### Layer 1: Type Definitions
```typescript
// types/auth.types.ts
export type OAuthProviderType = "google" | "jwt" | "onedrive";

export interface IAuthProvider {
  generateAuthUrl(state: string): string;
  getTokensFromCode(code: string): Promise<AuthToken>;
  refreshAccessToken(refreshToken: string): Promise<AuthToken>;
  revokeToken(token: string): Promise<void>;
  // ... other auth methods
}
```

### Layer 2: Provider Implementations
```typescript
// Multiple providers, same interface
class GoogleAuthProvider extends BaseAuthProvider {
  generateAuthUrl(state: string): string { ... }
  getTokensFromCode(code: string): Promise<AuthToken> { ... }
}

class JWTAuthProvider extends BaseAuthProvider {
  generateAuthUrl(state: string): string { ... }
  getTokensFromCode(code: string): Promise<AuthToken> { ... }
}

class OnedriveAuthProvider extends BaseAuthProvider {
  // Implementation for OneDrive
}
```

### Layer 3: Services (Orchestration)
```typescript
// Services know about interfaces, not implementations
class AuthService {
  private authProvider: IAuthProvider; // Injected/provided

  async handleOAuthCallback(req, code) {
    const tokens = await this.authProvider.getTokensFromCode(code);
    // Store in session
  }

  async getAuthStatus(req) {
    // Works with ANY provider
  }
}

class ExportService {
  async exportToGoogleDrive(req, input) {
    const token = await this.authService.ensureValidAccessToken(req);
    const storage = new GoogleDriveStorageProvider(token);
    const formatter = ExportFormatterFactory.getFormatter("raw");
    return formatter.export(..., storage, ...);
  }
}
```

### Usage Flow: Multiple Providers, Same Code

```typescript
// OLD: Need different code for each provider
if (provider === "google") {
  const service = getGoogleDriveService();
  const token = await service.getTokensFromCode(code);
  // ... Google-specific logic
} else if (provider === "onedrive") {
  // Need completely different service
  // Duplicate export logic
}

// NEW: Provider-agnostic code works for all
const authService = getAuthService("google"); // or "onedrive", "jwt"
const tokens = await authService.handleOAuthCallback(req, code);
// Same code works for all providers!
```

---

## File Structure Comparison

### OLD Structure (Monolithic)
```
src/services/
├── googleDrive.service.ts          (300+ lines, mixed concerns)
├── oauthConnexion.service.ts       (auth only, Google-specific)
├── export.service.ts               (minimal, depends on oauth)
└── notificationHub.service.ts

src/providers/
├── export/
│   └── googleDriveExport.provider.ts (export details)
└── oauth/
    └── googleDriveOauth.provider.ts  (Google-specific)
```

### NEW Structure (Layered)
```
src/types/
├── auth.types.ts                   (✨ NEW Type definitions)
└── export.types.ts                 (Enhanced types)

src/providers/
├── auth/                           (✨ NEW OAuth abstraction)
│   ├── BaseAuthProvider.ts
│   ├── GoogleAuthProvider.ts
│   ├── JWTAuthProvider.ts
│   ├── OnedriveAuthProvider.ts
│   ├── AuthProviderFactory.ts
│   └── AuthConfig.ts
│
├── storage/                        (✨ NEW Storage abstraction)
│   ├── IStorageProvider.ts
│   ├── GoogleDriveStorageProvider.ts
│   └── [S3Provider.ts, etc.]
│
└── export/                         (Refactored)
    ├── IExportFormatter.ts         (✨ NEW)
    ├── RawFormatExporter.ts        (✨ NEW)
    ├── PictoFormatExporter.ts      (✨ NEW)
    └── ExportFormatterFactory.ts   (✨ NEW)

src/services/
├── auth.service.ts                 (✨ NEW Provider-agnostic)
├── exportNew.service.ts            (✨ NEW With formatter/storage split)
├── oauthConnexion.service.ts       (Keep for compatibility)
└── notificationHub.service.ts      (Unchanged)
```

---

## Testability Comparison

### OLD: Testing is painful
```typescript
// Must test entire flow
describe("GoogleDriveService", () => {
  it("should export file", async () => {
    const service = getGoogleDriveService();
    // Mock OAuth client
    // Mock Drive API
    // Mock storage
    // Mock notifications
    // All interconnected - one mock breaks others
    const result = await service.exportToGoogleDrive(buffer, annotations);
    expect(result).toBeDefined();
  });
});
```

### NEW: Test providers independently
```typescript
// Test auth provider in isolation
describe("GoogleAuthProvider", () => {
  it("should exchange code for token", async () => {
    const provider = new GoogleAuthProvider(mockConfig);
    const tokens = await provider.getTokensFromCode(code);
    expect(tokens.access_token).toBeDefined();
  });
});

// Test export formatter in isolation
describe("RawFormatExporter", () => {
  it("should export in raw format", async () => {
    const formatter = new RawFormatExporter();
    const mockStorage = {
      uploadFile: jest.fn(),
      createFolder: jest.fn(),
    };
    const result = await formatter.export(buffer, annotations, options, mockStorage, folderId);
    expect(mockStorage.uploadFile).toHaveBeenCalledTimes(2);
  });
});

// Test service with mocked providers
describe("AuthService", () => {
  it("should work with any auth provider", async () => {
    // Mock provider
    const mockProvider: IAuthProvider = {
      getTokensFromCode: jest.fn().mockResolvedValue({ access_token: "test" }),
      // ... other methods
    };

    AuthProviderFactory.createProvider("google", {});
    // Swap implementation

    const service = new AuthService("google");
    const result = await service.handleOAuthCallback(mockReq, code);
    expect(result).toBeDefined();
  });
});
```

---

## Adding New Features

### Adding OneDrive Support

#### OLD Approach
```typescript
// Must duplicate enormous amounts of code!
class OneDriveService {
  // Copy all auth methods from GoogleDriveService
  async generateAuthUrl() { ... }  // Different Microsoft endpoints
  async getTokensFromCode() { ... }  // Different token exchange

  // Copy all export methods
  async createFolder() { ... }  // Different API
  async uploadFile() { ... }  // Different API

  // Result: 300+ lines duplicated with slight variations
}

// Routes need branching logic
if (provider === "google") {
  const service = getGoogleDriveService();
} else if (provider === "onedrive") {
  const service = getOneDriveService();
}
```

#### NEW Approach
```typescript
// Just implement the interface
class OnedriveAuthProvider extends BaseAuthProvider {
  get provider(): OAuthProviderType { return "onedrive"; }

  generateAuthUrl(state: string): string {
    // OneDrive-specific implementation
  }

  async getTokensFromCode(code: string): Promise<AuthToken> {
    // OneDrive-specific implementation
  }

  // ... implement other methods
}

// Routes need NO changes!
const authService = getAuthService("onedrive");
const tokens = await authService.handleOAuthCallback(req, code);
// Same code works
```

---

## Adding Export Formats

### OLD Approach
```typescript
// Must modify existing export service
class GoogleDriveService {
  async exportToGoogleDrive(...) {
    if (format === "raw") {
      // Upload separate image + annotations
    } else if (format === "picto") {
      // Upload combined file
    } else if (format === "custom") {
      // Add new case for custom format
      // Must modify this file!
    }
  }
}
```

### NEW Approach
```typescript
// Just create new formatter, no modifications needed
class CustomExporter extends BaseExportFormatter {
  async export(fileBuffer, annotations, options, storage, folderId) {
    // Custom format implementation
  }
}

// Register it
ExportFormatterFactory.getFormatter("custom");

// Service uses it automatically - no changes to ExportService!
```

---

## Scalability Summary

| Feature | OLD | NEW |
|---------|-----|-----|
| **Auth Providers** | 1 (Google) | 3+ (Google, JWT, OneDrive, etc.) |
| **Storage Backends** | 1 (Google Drive) | 3+ (Google Drive, OneDrive, S3, etc.) |
| **Export Formats** | 2 | 2+ (easily extensible) |
| **Lines per file** | 300+ | 50-150 |
| **Code duplication** | High | None |
| **Adding provider** | Copy entire service (300 lines) | Implement 6 methods |
| **Testability** | Must mock entire service | Mock individual providers |
| **Type safety** | Type assertions | Strict interfaces |

---

## Migration Timeline

### Week 1: Deploy & Monitor
- Deploy new services alongside old ones
- No breaking changes
- Gradual route migration

### Week 2: Migrate Routes
- Test with real users
- Monitor error rates
- Switch routes one at a time

### Week 3: OneDrive Support
- Implement `OnedriveAuthProvider`
- Implement `OnedriveStorageProvider`
- Add routes for OneDrive auth

### Week 4: S3 Support
- Implement `S3StorageProvider`
- Add S3 configuration
- Optional: Add S3 export routes

**Result: Scalable, maintainable, extensible architecture!** 🚀
