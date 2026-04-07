# Refactored Auth & Export Architecture

## Overview

This refactoring separates **Authentication**, **Storage**, and **Export** concerns while maintaining extensibility for multiple OAuth providers (Google, JWT, OneDrive) and storage backends (Google Drive, OneDrive, S3).

## Architecture Layers

```
Routes (API Layer)
    ↓
Services (Business Logic)
    ├── auth.service.ts (Authentication facade)
    └── exportNew.service.ts (Export orchestration)
        ↓
Providers (Implementation Details)
    ├── providers/auth/ (OAuth strategies)
    │   ├── GoogleAuthProvider
    │   ├── JWTAuthProvider
    │   └── OnedriveAuthProvider
    │
    ├── providers/storage/ (Storage backends)
    │   ├── GoogleDriveStorageProvider
    │   └── [Future: OneDriveStorageProvider, S3Provider]
    │
    └── providers/export/ (Export formats)
        ├── RawFormatExporter
        └── PictoFormatExporter
```

## Key Improvements

### 1. **Single Responsibility Principle**
- ✅ **Auth Service**: Only handles authentication & tokens
- ✅ **Export Service**: Only orchestrates exports
- ✅ **Storage Providers**: Handle cloud storage operations
- ✅ **Formatters**: Handle export file formatting

### 2. **Extensibility**
```typescript
// Adding OneDrive support in the future:
const authService = getAuthService("onedrive");
const client = await authService.ensureValidAccessToken(request);

// Adding S3 support:
const storage = new S3StorageProvider(config);
const result = await formatter.export(buffer, annotations, options, storage, bucketName);
```

### 3. **Type Safety**
- Discriminated unions for provider types
- Strict interfaces with no type assertions
- Config validation at initialization

### 4. **Testability**
- Providers are injectable and mockable
- Services decouple from implementation details
- Factories allow easy provider swaps in tests

## File Structure

### New/Modified Files
```
src/
├── types/
│   ├── auth.types.ts ✨ NEW (Auth domain types)
│   └── export.types.ts (Already exists, type-safe)
│
├── providers/
│   ├── auth/ ✨ NEW (OAuth provider implementations)
│   │   ├── BaseAuthProvider.ts
│   │   ├── GoogleAuthProvider.ts
│   │   ├── JWTAuthProvider.ts
│   │   ├── OnedriveAuthProvider.ts (Stub)
│   │   ├── AuthProviderFactory.ts
│   │   └── AuthConfig.ts
│   │
│   ├── storage/ ✨ NEW (Storage provider abstraction)
│   │   ├── IStorageProvider.ts
│   │   ├── GoogleDriveStorageProvider.ts
│   │   └── [Future: OnesdriveStorageProvider.ts, S3Provider.ts]
│   │
│   └── export/ (Refactored)
│       ├── IExportFormatter.ts ✨ NEW
│       ├── RawFormatExporter.ts ✨ NEW
│       ├── PictoFormatExporter.ts ✨ NEW
│       └── ExportFormatterFactory.ts ✨ NEW
│
├── services/
│   ├── auth.service.ts ✨ NEW (Provider-agnostic auth facade)
│   ├── exportNew.service.ts ✨ NEW (Refactored export)
│   ├── oauthConnexion.service.ts (Keep as compatibility layer)
│   └── notificationHub.service.ts (Unchanged)
│
└── routes/
    ├── oauth.routes.ts (Can keep existing or update)
    └── [export.routes.ts if needed]
```

## Usage Examples

### Authentication Flow
```typescript
// In routes
const authService = getAuthService("google");

// Generate auth URL
const authUrl = authService.generateAuthUrl(state);

// Handle callback
const result = await authService.handleOAuthCallback(req, code);

// Check auth status
const status = await authService.getAuthStatus(req);

// Disconnect
await authService.disconnect(req);
```

### Export Flow
```typescript
// In routes
const exportService = getExportService();

const result = await exportService.exportToGoogleDrive(req, {
  fileBuffer: imageBuffer,
  annotations: hotspots,
  options: {
    format: "raw",
    fileName: "360_photo",
    includeMetadata: true,
  },
});
```

## Migration Path

### Phase 1: Keep Existing (No Breaking Changes)
- Deploy new services alongside existing ones
- Routes can gradually migrate to new services
- Old `oauthConnexion.service` can act as adapter

### Phase 2: Gradual Adoption
```typescript
// Old way (still works)
const oldService = getOAuthConnexionService();

// New way (preferred)
const newService = getAuthService("google");
```

### Phase 3: Complete Migration
- Remove old files once all routes updated
- Clean up deprecated methods

## Configuration

### Environment Variables
```env
# Google OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=...

# JWT (for future)
JWT_SECRET=...
JWT_REFRESH_SECRET=...

# OneDrive (for future)
ONEDRIVE_CLIENT_ID=...
ONEDRIVE_CLIENT_SECRET=...
ONEDRIVE_REDIRECT_URI=...
```

## Error Handling

Each provider implements their own error handling:
```typescript
try {
  const tokens = await authProvider.getTokensFromCode(code);
} catch (error) {
  // Specific error message from provider
  // e.g., "GoogleAuthProvider: Failed to exchange code..."
}
```

## Future Extensions

### 1. Add JWT Auth Provider
```typescript
const jwtService = getAuthService("jwt");
const token = jwtService.generateToken({ sub: userId });
```

### 2. Add OneDrive Support
```typescript
// Implement OnedriveAuthProvider
// Implement OnedriveStorageProvider
const oneDriveService = getAuthService("onedrive");
```

### 3. Add S3 Support
```typescript
// Implement S3StorageProvider
const storage = new S3StorageProvider(config);
await storage.uploadFile(buffer, metadata, bucketName);
```

### 4. Add Custom Export Formats
```typescript
// Create CustomFormatExporter extends BaseExportFormatter
class CustomExporter extends BaseExportFormatter {
  async export(...) { /* implementation */ }
}

ExportFormatterFactory.register("custom", new CustomExporter());
```

## Benefits Summary

| Aspect | Before | After |
|--------|--------|-------|
| **Providers Supported** | Google only | Google, JWT (ext: OneDrive, S3) |
| **Code Organization** | Mixed concerns | Separated by responsibility |
| **Testing** | Mock entire service | Mock providers independently |
| **Adding Features** | Modify existing files | Add new provider/formatter |
| **Type Safety** | Type assertions | Strict interfaces |
| **File Size** | Large monolithic files | Smaller, focused files |

## Next Steps

1. ✅ Test the new auth/export services in non-critical paths
2. ✅ Migrate one route at a time to new services
3. ✅ Add monitoring/logging to track adoption
4. ✅ Prepare JWT provider implementation (stub provided)
5. ✅ Plan OneDrive integration timeline
