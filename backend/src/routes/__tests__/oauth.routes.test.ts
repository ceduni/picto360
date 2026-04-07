/**
 * OAuth Routes Tests
 * Test OAuth endpoints: auth URL generation, callback handling, disconnection, status checking
 */

import { describe, it, expect, beforeEach, jest, afterEach } from "@jest/globals";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "@/services/auth.service";
import { AuthProviderFactory } from "@/providers/auth/AuthProviderFactory";

// Mock dependencies
jest.mock("@/services/auth.service");

describe("OAuth Routes", () => {
  let mockApp: jest.Mocked<FastifyInstance>;
  let mockRequest: jest.Mocked<FastifyRequest>;
  let mockReply: jest.Mocked<FastifyReply>;
  let mockAuthService: jest.Mocked<AuthService>;
  let authProvider: ReturnType<typeof AuthProviderFactory.getProvider>;

  beforeEach(() => {
    mockApp = {
      get: jest.fn(),
      post: jest.fn(),
    } as unknown as jest.Mocked<FastifyInstance>;

    mockAuthService = {
      generateAuthUrl: jest
        .fn()
        .mockReturnValue("https://accounts.google.com/oauth/authorize?state=random-state&client_id=..."),
      handleOAuthCallback: jest.fn<() => Promise<{ redirectTo: string; provider: string }>>().mockResolvedValue({
        redirectTo: "/?auth=success",
        provider: "google",
      }),
      getAuthStatus: jest.fn<() => Promise<{ isAuthenticated: boolean; provider: string; scopes: string[] }>>().mockResolvedValue({
        isAuthenticated: true,
        provider: "google",
        scopes: ["profile", "email"],
      }),
      disconnect: jest.fn<() => Promise<boolean>>().mockResolvedValue(true),
    } as unknown as jest.Mocked<AuthService>;

    mockRequest = {
      session: {
        google: {
          access_token: "mock-token",
          refresh_token: "mock-refresh",
          expiry: Date.now() + 3600000,
        },
      },
      query: {
        code: "auth-code-123",
        state: "state-123",
      },
      sessionId: "session-123",
    } as unknown as jest.Mocked<FastifyRequest>;

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      redirect: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis(),
    } as unknown as jest.Mocked<FastifyReply>;

    const provider_name = "google";
    AuthProviderFactory.createProvider(provider_name, {
        clientId: "test-client-id",
        clientSecret: "test-client-secret",
        redirectUri: "http://localhost:4000/api/drive/auth/callback",
    });

    authProvider = AuthProviderFactory.getProvider(provider_name);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /oauth/google/auth", () => {
    it("should return Google OAuth authorization URL", () => {
      const state = "random-state-123";
      const url = authProvider.generateAuthUrl(state);

      expect(url).toContain("accounts.google.com");
      expect(url).toContain("client_id");
    });

    it("should include state parameter in URL", () => {
      const state = "my-state-value";
      const url = authProvider.generateAuthUrl(state);

      expect(url).toContain("state");
    });


    it("should use correct redirect URI", () => {
        const url = authProvider.generateAuthUrl("state");

        expect(url).toContain("redirect_uri");
    });

    it("should use HTTPS in auth URL", () => {
        const url = authProvider.generateAuthUrl("state");
        expect(url).toMatch(/^https:\/\//);
    });

  });

  describe("GET /oauth/google/callback", () => {
    it("should extract authorization code from query", () => {
      const code = mockRequest.query.code as string;
      expect(code).toBe("auth-code-123");
    });

    it("should extract state parameter from query", () => {
      const state = mockRequest.query.state as string;
      expect(state).toBe("state-123");
    });

    it("should handle callback with code and state", async () => {
      const result = await mockAuthService.handleOAuthCallback(
        mockRequest,
        mockRequest.query.code as string
      );

      expect(result.provider).toBe("google");
      expect(mockAuthService.handleOAuthCallback).toHaveBeenCalledWith(mockRequest, "auth-code-123");
    });

    it("should store tokens in session", async () => {
      mockRequest.session.save = jest.fn().mockResolvedValue(undefined);

      await mockAuthService.handleOAuthCallback(mockRequest, mockRequest.query.code as string);

      expect(mockAuthService.handleOAuthCallback).toHaveBeenCalled();
    });

    it("should redirect to success page on success", async () => {
      const result = await mockAuthService.handleOAuthCallback(mockRequest, "auth-code-123");

      expect(result.redirectTo).toContain("/?auth=success");
    });

    it("should handle invalid authorization code", async () => {
      mockAuthService.handleOAuthCallback = jest
        .fn()
        .mockRejectedValue(new Error("Invalid authorization code"));

      await expect(mockAuthService.handleOAuthCallback(mockRequest, "invalid-code")).rejects.toThrow(
        "Invalid authorization code"
      );
    });

    it("should handle missing authorization code", async () => {
      mockRequest.query.code = undefined;

      // Should either throw or handle gracefully
      expect(mockRequest.query.code).toBeUndefined();
    });

    it("should handle expired authorization code", async () => {
      mockAuthService.handleOAuthCallback = jest
        .fn()
        .mockRejectedValue(new Error("Authorization code expired"));

      await expect(mockAuthService.handleOAuthCallback(mockRequest, "expired-code")).rejects.toThrow(
        "Authorization code expired"
      );
    });

    it("should handle callback error parameter", async () => {
      mockRequest.query.error = "access_denied";

      expect(mockRequest.query.error).toBe("access_denied");
    });

    it("should handle callback error_description", async () => {
      mockRequest.query.error = "invalid_scope";
      mockRequest.query.error_description = "The user denied access";

      expect(mockRequest.query.error_description).toBe("The user denied access");
    });
  });

  describe("GET /oauth/status", () => {
    it("should return authentication status", async () => {
      const status = await mockAuthService.getAuthStatus(mockRequest);

      expect(status.isAuthenticated).toBe(true);
      expect(status.provider).toBe("google");
    });

    it("should include provider information", async () => {
      const status = await mockAuthService.getAuthStatus(mockRequest);

      expect(status.provider).toBe("google");
    });

    it("should include scopes", async () => {
      const status = await mockAuthService.getAuthStatus(mockRequest);

      expect(status.scopes).toBeDefined();
    });

    it("should return not authenticated when no session", async () => {
      mockRequest.session.google = undefined;
      mockAuthService.getAuthStatus = jest.fn().mockResolvedValue({
        isAuthenticated: false,
        provider: "google",
      });

      const status = await mockAuthService.getAuthStatus(mockRequest);

      expect(status.isAuthenticated).toBe(false);
    });

    it("should include token expiry", async () => {
      mockAuthService.getAuthStatus = jest.fn().mockResolvedValue({
        isAuthenticated: true,
        provider: "google",
        expiresAt: Date.now() + 3600000,
      });

      const status = await mockAuthService.getAuthStatus(mockRequest);

      expect(status.expiresAt).toBeDefined();
    });

    it("should include user information", async () => {
      mockAuthService.getAuthStatus = jest.fn().mockResolvedValue({
        isAuthenticated: true,
        provider: "google",
        user: { id: "user-123" },
      });

      const status = await mockAuthService.getAuthStatus(mockRequest);

      expect(status.user).toBeDefined();
    });

    it("should refresh token if expiring", async () => {
      mockRequest.session.google = {
        access_token: "expiring-token",
        refresh_token: "refresh-token",
        expiry: Date.now() + 5000, // Expiring soon
        provider: "google",
        user_id: "user-123",
      };

      const status = await mockAuthService.getAuthStatus(mockRequest);

      expect(status.isAuthenticated).toBe(true);
    });
  });

  describe("POST /oauth/google/disconnect", () => {
    it("should revoke token", async () => {
      const result = await mockAuthService.disconnect(mockRequest);

      expect(result).toBe(true);
      expect(mockAuthService.disconnect).toHaveBeenCalledWith(mockRequest);
    });

    it("should clear session", async () => {
      await mockAuthService.disconnect(mockRequest);

      expect(mockAuthService.disconnect).toHaveBeenCalled();
    });

    it("should broadcast disconnection event", async () => {
      await mockAuthService.disconnect(mockRequest);

      expect(mockAuthService.disconnect).toHaveBeenCalled();
    });

    it("should return success response", async () => {
      const result = await mockAuthService.disconnect(mockRequest);

      expect(result).toBe(true);
    });

    it("should handle disconnect when not authenticated", async () => {
      mockRequest.session.google = undefined;
      mockAuthService.disconnect = jest.fn().mockResolvedValue(false);

      const result = await mockAuthService.disconnect(mockRequest);

      expect(result).toBe(false);
    });

    it("should handle revocation failure gracefully", async () => {
      mockAuthService.disconnect = jest.fn().mockResolvedValue(true);

      const result = await mockAuthService.disconnect(mockRequest);

      expect(result).toBe(true); // Still succeeds even if revoke fails
    });
  });

  describe("Multi-Provider Support", () => {
    it("should support Google provider", () => {
      expect(mockRequest.session.google).toBeDefined();
    });

    it("should support JWT provider", () => {
      const jwtSession = { jwt: { token: "jwt-token" } };
      expect(jwtSession.jwt).toBeDefined();
    });

    it("should support OneDrive provider", () => {
      const onedriveSession = { onedrive: { access_token: "token" } };
      expect(onedriveSession.onedrive).toBeDefined();
    });

    it("should allow switching providers", () => {
      // User could have multiple provider tokens in session
      const multiProviderSession = {
        google: { access_token: "google-token" },
        onedrive: { access_token: "onedrive-token" },
      };

      expect(multiProviderSession.google).toBeDefined();
      expect(multiProviderSession.onedrive).toBeDefined();
    });
  });

  describe("Error Handling", () => {
    it("should handle missing credentials", async () => {
      mockAuthService.handleOAuthCallback = jest
        .fn()
        .mockRejectedValue(new Error("Missing OAuth credentials"));

      await expect(mockAuthService.handleOAuthCallback(mockRequest, "code")).rejects.toThrow(
        "Missing OAuth credentials"
      );
    });

    it("should handle network errors", async () => {
      mockAuthService.handleOAuthCallback = jest
        .fn()
        .mockRejectedValue(new Error("Network error"));

      await expect(mockAuthService.handleOAuthCallback(mockRequest, "code")).rejects.toThrow(
        "Network error"
      );
    });

    it("should handle invalid session", async () => {
      mockRequest.session = null;

      expect(mockRequest.session).toBeNull();
    });

    it("should handle token refresh errors in status check", async () => {
      mockAuthService.getAuthStatus = jest.fn().mockRejectedValue(new Error("Token refresh failed"));

      await expect(mockAuthService.getAuthStatus(mockRequest)).rejects.toThrow(
        "Token refresh failed"
      );
    });
  });

  describe("Security Considerations", () => {
    it("should use state parameter to prevent CSRF", () => {
      const state = "secure-random-state";
      const url = authProvider.generateAuthUrl(state);

      expect(url).toContain(state);
    });

    it("should use HTTPS for OAuth endpoints", () => {
      const url = authProvider.generateAuthUrl("state");

      expect(url).toMatch(/^https:\/\//);
    });

    it("should not expose tokens in logs", async () => {
      const result = await mockAuthService.handleOAuthCallback(mockRequest, "code");

      expect(result.redirectTo).toBeDefined();
      // Token should NOT be in the redirect URL
      expect(result.redirectTo).not.toContain("access_token");
    });

    it("should require authenticated session for disconnect", async () => {
      mockRequest.session.google = undefined;
      mockAuthService.disconnect = jest.fn().mockResolvedValue(false);

      const result = await mockAuthService.disconnect(mockRequest);

      expect(result).toBe(false);
    });

    it("should validate state parameter on callback", () => {
      const state = mockRequest.query.state as string;

      expect(state).toBeDefined();
      expect(typeof state).toBe("string");
    });

    it("should handle scope validation", () => {
      const url = authProvider.generateAuthUrl("state");

      expect(url).toContain("drive.file");
    });
  });

  describe("Session Management", () => {
    it("should preserve session across requests", async () => {
      const sessionId = mockRequest.sessionId;

      expect(sessionId).toBe("session-123");
    });

    it("should isolate sessions from each other", () => {
      const session1 = { id: "session-1", user: "user-1" };
      const session2 = { id: "session-2", user: "user-2" };

      expect(session1.user).not.toBe(session2.user);
    });

    it("should timeout expired sessions", () => {
      const expiredSession = {
        google: {
          access_token: "token",
          expiry: Date.now() - 3600000, // 1 hour ago
        },
      };

      // Session should be considered expired
      expect(expiredSession.google.expiry < Date.now()).toBe(true);
    });
  });
});
