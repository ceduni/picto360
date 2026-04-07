/**
 * Auth Service Tests
 * Test authentication flow: OAuth, token refresh, session management, disconnection
 */

import { describe, it, expect, beforeEach, jest, afterEach } from "@jest/globals";
import { AuthService } from "@/services/auth.service";
import { GoogleAuthProvider } from "@/providers/auth/GoogleAuthProvider";
import { AuthProviderFactory } from "@/providers/auth/AuthProviderFactory";
import { getNotificationHubService } from "@/services/notificationHub.service";
import { FastifyRequest } from "fastify";
import { AuthToken, AuthUserInfo, SessionConnection } from "@/types/auth.types";
import { UserInfo } from "firebase-admin/lib/auth/user-record";
import { mock } from "node:test";

// Mock dependencies
jest.mock("@/providers/auth/AuthProviderFactory");
jest.mock("@/services/notificationHub.service");

describe("AuthService", () => {
  let authService: AuthService;
  let mockAuthProvider: jest.Mocked<GoogleAuthProvider>;
  let mockNotificationHub: jest.Mocked<ReturnType<typeof getNotificationHubService>>;
  let mockRequest: jest.Mocked<FastifyRequest>;

  const mockTokens: AuthToken = {
    access_token: "mock-access-token",
    refresh_token: "mock-refresh-token",
    expiry_date: Date.now() + 3600000, // 1 hour from now
    token_type: "Bearer",
  };

  const mockUserInfo: AuthUserInfo = {
    uid: "user-123",
    email: "test@example.com",
    displayName: "Test User",
    providerId: "google.com",
    toJSON: () => ({ uid: "user-123", email: "test@example.com", displayName: "Test User", providerId: "google.com" }),
  };

  beforeEach(() => {
    // Setup mocks
    mockAuthProvider = {
        getTokensFromCode: jest.fn<(code:string)=>Promise<AuthToken>>().mockResolvedValue(mockTokens),
        getUserInfo: jest.fn<(accessToken: string) => Promise<AuthUserInfo>>().mockResolvedValue(mockUserInfo),
        refreshAccessToken: jest.fn<(refreshToken: string) => Promise<AuthToken>>().mockResolvedValue({
            ...mockTokens,
            access_token: "new-access-token",
        }),
        revokeToken: jest.fn<(token: string) => Promise<void>>().mockResolvedValue(undefined),
        generateAuthUrl: jest.fn<(state: string) => string>().mockReturnValue("https://accounts.google.com/oauth/authorize?..."),
        validateConfig: jest.fn(),
    } as unknown as jest.Mocked<GoogleAuthProvider>;

    mockNotificationHub = {
      emit: jest.fn(),
    } as unknown as jest.Mocked<ReturnType<typeof getNotificationHubService>>;

    mockRequest = {
      session: {
        notificationScope: "session-123",
      },
    } as unknown as jest.Mocked<FastifyRequest>;

    (AuthProviderFactory.hasProvider as jest.Mock).mockReturnValue(true);
    (AuthProviderFactory.getProvider as jest.Mock).mockReturnValue(mockAuthProvider);
    (AuthProviderFactory.createProvider as jest.Mock).mockReturnValue(mockAuthProvider);

    authService = new AuthService("google");
    authService.setNotificationHub(mockNotificationHub);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("generateAuthUrl", () => {
    it("should generate auth URL with state parameter", () => {
      const url = authService.generateAuthUrl("state-123");

      expect(url).toBe("https://accounts.google.com/oauth/authorize?...");
      expect(mockAuthProvider.generateAuthUrl).toHaveBeenCalledWith("state-123");
    });

    it("should return valid URL format", () => {
      const url = authService.generateAuthUrl("test-state");

      expect(url).toMatch(/^https:\/\/accounts\.google\.com/);
    });
  });

  describe("handleOAuthCallback", () => {
    it("should exchange code for tokens", async () => {
      const result = await authService.handleOAuthCallback(mockRequest, "auth-code-123");

      expect(mockAuthProvider.getTokensFromCode).toHaveBeenCalledWith("auth-code-123");
      expect(result.provider).toBe("google");
    });

    it("should retrieve user info after getting tokens", async () => {
      await authService.handleOAuthCallback(mockRequest, "auth-code-123");

      expect(mockAuthProvider.getUserInfo).toHaveBeenCalledWith(mockTokens.access_token);
    });

    it("should store tokens in session", async () => {
      mockRequest.session.save = jest.fn<() => Promise<void>>().mockResolvedValue(undefined);

      await authService.handleOAuthCallback(mockRequest, "auth-code-123");

      console.log("Session after callback:", mockRequest.session.auth_google);
      expect(mockRequest.session.auth_google).toEqual(
        expect.objectContaining({
          access_token: mockTokens.access_token,
          refresh_token: mockTokens.refresh_token,
          provider: "google",
          expiry: expect.any(Number),
          user_id: mockUserInfo.uid,
        })
      );
    });

    it("should broadcast auth-status event on success", async () => {
      mockRequest.session.save = jest.fn<() => Promise<void>>().mockResolvedValue(undefined);

      await authService.handleOAuthCallback(mockRequest, "auth-code-123");

      expect(mockNotificationHub.emit).toHaveBeenCalledWith(
        `user-${mockRequest.session.notificationScope}`,
        "auth-status",
        expect.objectContaining({
          connected: true,
          provider: "google",
          user: expect.objectContaining(mockUserInfo),
          expiry: expect.any(Number),
        })
      );
    });

    it("should set expiry date in session", async () => {
      mockRequest.session.save = jest.fn<() => Promise<void>>().mockResolvedValue(undefined);

      await authService.handleOAuthCallback(mockRequest, "auth-code-123");

      expect(mockRequest.session.auth_google!.expiry).toBeDefined();
      expect(typeof mockRequest.session.auth_google!.expiry).toBe("number");
    });

    it("should handle token exchange failure", async () => {
      mockAuthProvider.getTokensFromCode = jest.fn<() => Promise<AuthToken>>().mockRejectedValue(
        new Error("Invalid authorization code")
      );

      await expect(authService.handleOAuthCallback(mockRequest, "invalid-code")).rejects.toThrow(
        "Invalid authorization code"
      );
    });

    it("should handle user info retrieval failure", async () => {
      mockAuthProvider.getUserInfo = jest.fn<() => Promise<typeof mockUserInfo>>().mockRejectedValue(new Error("Failed to get user info"));

      await expect(authService.handleOAuthCallback(mockRequest, "auth-code-123")).rejects.toThrow(
        "Failed to get user info"
      );
    });
  });

  describe("ensureConnection", () => {
    it("should return token if still valid", async () => {
      mockRequest.session.auth_google = {
        access_token: mockTokens.access_token,
        refresh_token: mockTokens.refresh_token,
        expiry: Date.now() + 3600000,
        provider: "google",
        user_id: "user-123",
      };

      const token = await authService.ensureConnection(mockRequest);

      expect(token).toBe(mockTokens.access_token);
      expect(mockAuthProvider.refreshAccessToken).not.toHaveBeenCalled();
    });

    it("should refresh token if expiring soon (within 10 seconds)", async () => {
      const expiringToken : SessionConnection = {
        access_token: "expiring-token",
        refresh_token: mockTokens.refresh_token,
        expiry: Date.now() + 5000, // 5 seconds
        provider: "google",
        user_id: "user-123",
      };

      mockRequest.session.auth_google = expiringToken;
      mockRequest.session.save = jest.fn<() => Promise<void>>().mockResolvedValue(undefined);

      await authService.ensureConnection(mockRequest);

      expect(mockAuthProvider.refreshAccessToken).toHaveBeenCalledWith(mockTokens.refresh_token);
    });

    it("should update session with new token after refresh", async () => {
      const expiringToken: SessionConnection = {
        access_token: "old-token",
        refresh_token: mockTokens.refresh_token,
        expiry: Date.now() - 1000, // Expired
        provider: "google",
        user_id: "user-123",
      };

      mockRequest.session.auth_google = expiringToken;
      mockRequest.session.save = jest.fn<() => Promise<void>>().mockResolvedValue(undefined);

      const token = await authService.ensureConnection(mockRequest);

      expect(mockRequest.session.auth_google.access_token).toBe("new-access-token");
      expect(token).toBe("new-access-token");
    });

    it("should throw if not authenticated", async () => {
      mockRequest.session.auth_google = undefined;

      await expect(authService.ensureConnection(mockRequest)).rejects.toThrow(
        "Not authenticated with google"
      );
    });

    it("should throw if no refresh token available", async () => {
      const tokenWithoutRefresh: SessionConnection = {
        access_token: "expired-token",
        refresh_token: undefined,
        expiry: Date.now() - 1000,
        provider: "google",
        user_id: "user-123",
      };

      mockRequest.session.auth_google = tokenWithoutRefresh;

      await expect(authService.ensureConnection(mockRequest)).rejects.toThrow(
        "No refresh token available for google"
      );
    });

    it("should clear session if refresh fails", async () => {
      const expiringToken: SessionConnection = {
        access_token: "old-token",
        refresh_token: mockTokens.refresh_token,
        expiry: Date.now() - 1000,
        provider: "google",
        user_id: "user-123",
      };

      mockRequest.session.auth_google = expiringToken;
      mockRequest.session.save = jest.fn<() => Promise<void>>().mockResolvedValue(undefined);
      mockAuthProvider.refreshAccessToken = jest.fn<() => Promise<typeof mockTokens>>().mockRejectedValue(new Error("Refresh failed"));

      await expect(authService.ensureConnection(mockRequest)).rejects.toThrow("Failed to refresh token: Error: Refresh failed");

      expect(mockRequest.session.auth_google).toBeUndefined();
    });

    it("should broadcast auth-status on refresh success", async () => {
      const expiringToken : SessionConnection = {
        access_token: "old-token",
        refresh_token: mockTokens.refresh_token,
        expiry: Date.now() - 1000,
        provider: "google",
        user_id: "user-123",
      };

      mockRequest.session.auth_google = expiringToken;
      mockRequest.session.save = jest.fn<() => Promise<void>>().mockResolvedValue(undefined);

      await authService.ensureConnection(mockRequest);

      expect(mockNotificationHub.emit).toHaveBeenCalledWith(
        `user-${mockRequest.session.notificationScope}`,
        "auth-status",
        expect.objectContaining({
          connected: true,
          refreshed: true,
        })
      );
    });
  });

  describe("getAuthStatus", () => {
    it("should return authenticated status if logged in", async () => {
      mockRequest.session.auth_google = {
        access_token: mockTokens.access_token,
        refresh_token: mockTokens.refresh_token,
        expiry: Date.now() + 3600000,
        provider: "google",
        user_id: "user-123",
      };

      const status = await authService.getAuthStatus(mockRequest);

      expect(status.isAuthenticated).toBe(true);
      expect(status.provider).toBe("google");
    });

    it("should return not authenticated if no session", async () => {
      mockRequest.session.auth_google = undefined;

      const status = await authService.getAuthStatus(mockRequest);

      expect(status.isAuthenticated).toBe(false);
      expect(status.provider).toBe("google");
    });

    it("should include expiry date in response", async () => {
      const expiryTime = Date.now() + 7200000;
      mockRequest.session.auth_google = {
        access_token: mockTokens.access_token,
        refresh_token: mockTokens.refresh_token,
        expiry: expiryTime,
        provider: "google",
        user_id: "user-123",
      };

      const status = await authService.getAuthStatus(mockRequest);

      expect(status.expiresAt).toBe(expiryTime);
    });

    it("should include user info in response", async () => {
      mockRequest.session.auth_google = {
        access_token: mockTokens.access_token,
        refresh_token: mockTokens.refresh_token,
        expiry: Date.now() + 3600000,
        provider: "google",
        user_id: "user-123",
      };

      const status = await authService.getAuthStatus(mockRequest);

      expect(status.user).toEqual(expect.objectContaining(mockUserInfo));
    });

    it("should refresh token if expiring", async () => {
      const expiringToken: SessionConnection = {
        access_token: "expiring-token",
        refresh_token: mockTokens.refresh_token,
        expiry: Date.now() + 5000, // Expiring soon
        provider: "google",
        user_id: "user-123",
      };

      mockRequest.session.auth_google = expiringToken;
      mockRequest.session.save = jest.fn<() => Promise<void>>().mockResolvedValue(undefined);

      await authService.getAuthStatus(mockRequest);

      expect(mockAuthProvider.refreshAccessToken).toHaveBeenCalled();
    });
  });

  describe("disconnect", () => {
    it("should revoke token with provider", async () => {
      mockRequest.session.auth_google = {
        access_token: mockTokens.access_token,
        refresh_token: mockTokens.refresh_token,
        expiry: Date.now() + 3600000,
        provider: "google",
        user_id: "user-123",
      };
      mockRequest.session.save = jest.fn<() => Promise<void>>().mockResolvedValue(undefined);

      await authService.disconnect(mockRequest);

      expect(mockAuthProvider.revokeToken).toHaveBeenCalledWith(mockTokens.access_token);
    });

    it("should clear session data", async () => {
      mockRequest.session.auth_google = {
        access_token: mockTokens.access_token,
        refresh_token: mockTokens.refresh_token,
        expiry: Date.now() + 3600000,
        provider: "google",
        user_id: "user-123",
      };
      mockRequest.session.save = jest.fn<() => Promise<void>>().mockResolvedValue(undefined);

      await authService.disconnect(mockRequest);

      expect(mockRequest.session.auth_google).toBeUndefined();
    });

    it("should broadcast disconnect event", async () => {
      mockRequest.session.auth_google = {
        access_token: mockTokens.access_token,
        refresh_token: mockTokens.refresh_token,
        expiry: Date.now() + 3600000,
        provider: "google",
        user_id: "user-123",
      };
      mockRequest.session.save = jest.fn<() => Promise<void>>().mockResolvedValue(undefined);

      await authService.disconnect(mockRequest);

      expect(mockNotificationHub.emit).toHaveBeenCalledWith(
        `user-${mockRequest.session.notificationScope}`,
        "auth-status",
        expect.objectContaining({
          connected: false,
          provider: "google",
        })
      );
    });

    it("should gracefully handle revoke failure", async () => {
      mockRequest.session.auth_google = {
        access_token: mockTokens.access_token,
        refresh_token: mockTokens.refresh_token,
        expiry: Date.now() + 3600000,
        provider: "google",
        user_id: "user-123",
      };
      mockRequest.session.save = jest.fn<() => Promise<void>>().mockResolvedValue(undefined);
      mockAuthProvider.revokeToken = jest.fn<() => Promise<void>>().mockRejectedValue(new Error("Revoke failed"));

      const result = await authService.disconnect(mockRequest);

      expect(result).toBe(true); // Should still succeed
      expect(mockRequest.session.auth_google).toBeUndefined(); // Session should still be cleared
    });

    it("should return false if not authenticated", async () => {
      mockRequest.session.auth_google = undefined;

      const result = await authService.disconnect(mockRequest);

      expect(result).toBe(false);
    });
  });

  describe("Session Scope Isolation", () => {
    it("should emit notifications to correct session scope", async () => {
      mockRequest.session.notificationScope = "session-xyz";
      mockRequest.session.save = jest.fn<() => Promise<void>>().mockResolvedValue(undefined);

      await authService.handleOAuthCallback(mockRequest, "auth-code-123");

      const calls = mockNotificationHub.emit.mock.calls;
      calls.forEach((call) => {
        expect(call[0]).toBe(`user-${mockRequest.session.notificationScope}`);
      });
    });
  });
});
