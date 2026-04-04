/**
 * NotificationHubService (SSE) Tests
 * Test Server-Sent Events functionality: client management, event broadcasting, session isolation
 */

import { describe, it, expect, beforeEach, jest, afterEach } from "@jest/globals";
import { getNotificationHubService, NotificationClient } from "@/services/notificationHub.service";

describe("NotificationHubService (SSE)", () => {
  let notificationHub: ReturnType<typeof getNotificationHubService>;
  let mockClients: jest.Mocked<NotificationClient>[];

  beforeEach(() => {
    notificationHub = getNotificationHubService();
    mockClients = [
      { id: "client-1", write: jest.fn() },
      { id: "client-2", write: jest.fn() },
      { id: "client-3", write: jest.fn() },
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Client Management", () => {
    it("should register a client for a scope", () => {
      notificationHub.addClient("session-1", mockClients[0]);

      // Should not throw error when emitting to this scope
      notificationHub.emit("session-1", "test-event", { data: "test" });
      expect(mockClients[0].write).toHaveBeenCalled();
    });

    it("should remove a client from a scope", () => {
      notificationHub.addClient("session-1", mockClients[0]);
      notificationHub.removeClient("session-1", mockClients[0]);

      notificationHub.emit("session-1", "test-event", { data: "test" });
      expect(mockClients[0].write).not.toHaveBeenCalled();
    });

    it("should support multiple clients per scope", () => {
      notificationHub.addClient("session-1", mockClients[0]);
      notificationHub.addClient("session-1", mockClients[1]);

      notificationHub.emit("session-1", "test-event", { data: "test" });

      expect(mockClients[0].write).toHaveBeenCalled();
      expect(mockClients[1].write).toHaveBeenCalled();
    });

    it("should support multiple scopes", () => {
      notificationHub.addClient("session-1", mockClients[0]);
      notificationHub.addClient("session-2", mockClients[1]);

      notificationHub.emit("session-1", "test-event", { data: "test" });

      expect(mockClients[0].write).toHaveBeenCalled();
      expect(mockClients[1].write).not.toHaveBeenCalled();
    });

    it("should clean up empty scopes after removing last client", () => {
      notificationHub.addClient("session-1", mockClients[0]);
      notificationHub.removeClient("session-1", mockClients[0]);

      notificationHub.emit("session-1", "test-event", { data: "test" });
      expect(mockClients[0].write).not.toHaveBeenCalled();
    });

    it("should handle removing non-existent client gracefully", () => {
      expect(() => {
        notificationHub.removeClient("non-existent-scope", mockClients[0]);
      }).not.toThrow();
    });
  });

  describe("Event Broadcasting", () => {
    it("should format events as SSE stream", () => {
      notificationHub.addClient("session-1", mockClients[0]);

      notificationHub.emit("session-1", "auth-status", { connected: true });

      expect(mockClients[0].write).toHaveBeenCalledWith(
        expect.stringMatching(/event: auth-status\ndata: {"connected":true}\n\n/)
      );
    });

    it("should handle complex object payloads", () => {
      notificationHub.addClient("session-1", mockClients[0]);

      const payload = {
        status: "uploading",
        file: "image.jpg",
        progress: { uploaded: 5000, total: 10000, percent: "50%" },
      };

      notificationHub.emit("session-1", "upload-progress", payload);

      const call = mockClients[0].write.mock.calls[0][0];
      expect(call).toContain("event: upload-progress");
      expect(call).toContain(JSON.stringify(payload));
    });

    it("should handle null/undefined data", () => {
      notificationHub.addClient("session-1", mockClients[0]);

      notificationHub.emit("session-1", "test-event", null);

      expect(mockClients[0].write).toHaveBeenCalledWith(
        expect.stringMatching(/event: test-event\ndata: null\n\n/)
      );
    });

    it("should broadcast to all clients in scope", () => {
      notificationHub.addClient("session-1", mockClients[0]);
      notificationHub.addClient("session-1", mockClients[1]);
      notificationHub.addClient("session-1", mockClients[2]);

      notificationHub.emit("session-1", "broadcast-event", { message: "Hello all" });

      mockClients.forEach((client) => {
        expect(client.write).toHaveBeenCalledWith(
          expect.stringMatching(/event: broadcast-event/)
        );
      });
    });

    it("should NOT broadcast to clients in other scopes", () => {
      notificationHub.addClient("session-1", mockClients[0]);
      notificationHub.addClient("session-2", mockClients[1]);

      notificationHub.emit("session-1", "private-event", { data: "secret" });

      expect(mockClients[0].write).toHaveBeenCalled();
      expect(mockClients[1].write).not.toHaveBeenCalled();
    });

    it("should silently ignore emit to non-existent scope", () => {
      expect(() => {
        notificationHub.emit("non-existent-scope", "test-event", { data: "test" });
      }).not.toThrow();
    });
  });

  describe("Use Case: Auth Status Notifications", () => {
    it("should notify client of successful authentication", () => {
      notificationHub.addClient("user-session-123", mockClients[0]);

      notificationHub.emit("user-session-123", "auth-status", {
        connected: true,
        provider: "google",
        user: { id: "user-123", email: "test@example.com" },
      });

      const payload = mockClients[0].write.mock.calls[0][0];
      expect(payload).toContain("event: auth-status");
      expect(payload).toContain("connected");
      expect(payload).toContain("google");
    });

    it("should notify client of token refresh", () => {
      notificationHub.addClient("user-session-123", mockClients[0]);

      notificationHub.emit("user-session-123", "auth-status", {
        connected: true,
        provider: "google",
        refreshed: true,
      });

      const payload = mockClients[0].write.mock.calls[0][0];
      expect(payload).toContain("refreshed");
    });

    it("should notify client of disconnection", () => {
      notificationHub.addClient("user-session-123", mockClients[0]);

      notificationHub.emit("user-session-123", "auth-status", {
        connected: false,
        provider: "google",
      });

      const payload = mockClients[0].write.mock.calls[0][0];
      expect(payload).toContain("connected");
      expect(payload).not.toContain("true");
    });
  });

  describe("Use Case: Upload Progress Notifications", () => {
    it("should stream upload progress events", () => {
      notificationHub.addClient("user-session-123", mockClients[0]);

      // Simulate multiple progress updates
      for (let i = 0; i <= 100; i += 25) {
        notificationHub.emit("user-session-123", "upload-progress", {
          file: "image.jpg",
          uploaded: i * 10000,
          total: 1000000,
          percent: `${i}%`,
        });
      }

      expect(mockClients[0].write).toHaveBeenCalledTimes(5);
      expect(mockClients[0].write.mock.calls[0][0]).toContain("0%");
      expect(mockClients[0].write.mock.calls[4][0]).toContain("100%");
    });

    it("should notify client of upload completion", () => {
      notificationHub.addClient("user-session-123", mockClients[0]);

      notificationHub.emit("user-session-123", "upload-complete", {
        fileId: "file-123",
        fileName: "image.jpg",
      });

      const payload = mockClients[0].write.mock.calls[0][0];
      expect(payload).toContain("event: upload-complete");
    });

    it("should notify client of export status changes", () => {
      notificationHub.addClient("user-session-123", mockClients[0]);

      notificationHub.emit("user-session-123", "export-status", {
        status: "folder_created",
        folderId: "folder-123",
      });

      const payload = mockClients[0].write.mock.calls[0][0];
      expect(payload).toContain("folder_created");
    });

    it("should notify client of export errors", () => {
      notificationHub.addClient("user-session-123", mockClients[0]);

      notificationHub.emit("user-session-123", "export-error", {
        error: "Failed to create folder",
        code: "FOLDER_CREATE_ERROR",
      });

      const payload = mockClients[0].write.mock.calls[0][0];
      expect(payload).toContain("event: export-error");
    });
  });

  describe("Session Isolation", () => {
    it("should prevent message leakage between sessions", () => {
      // Two different users
      notificationHub.addClient("session-user-1", mockClients[0]);
      notificationHub.addClient("session-user-2", mockClients[1]);

      // Send sensitive data to user 1
      const sensitiveData = { apiKey: "secret-key-123" };
      notificationHub.emit("session-user-1", "sensitive-event", sensitiveData);

      // Verify user 1 got it
      expect(mockClients[0].write).toHaveBeenCalled();

      // Verify user 2 did NOT get it
      expect(mockClients[1].write).not.toHaveBeenCalled();
    });

    it("should isolate concurrent operations across sessions", () => {
      notificationHub.addClient("session-1", mockClients[0]);
      notificationHub.addClient("session-2", mockClients[1]);

      // Session 1 uploads file A
      notificationHub.emit("session-1", "upload-progress", { file: "file-a.jpg", percent: "50%" });

      // Session 2 uploads file B
      notificationHub.emit("session-2", "upload-progress", { file: "file-b.jpg", percent: "75%" });

      // Each should have received only their own progress
      const payload1 = mockClients[0].write.mock.calls[0][0];
      const payload2 = mockClients[1].write.mock.calls[0][0];

      expect(payload1).toContain("file-a.jpg");
      expect(payload1).not.toContain("file-b.jpg");

      expect(payload2).toContain("file-b.jpg");
      expect(payload2).not.toContain("file-a.jpg");
    });
  });

  describe("Edge Cases", () => {
    it("should handle special characters in event names", () => {
      notificationHub.addClient("session-1", mockClients[0]);

      notificationHub.emit("session-1", "event-with-special_chars.v1", { data: "test" });

      expect(mockClients[0].write).toHaveBeenCalledWith(
        expect.stringMatching(/event: event-with-special_chars\.v1/)
      );
    });

    it("should handle large payloads", () => {
      notificationHub.addClient("session-1", mockClients[0]);

      const largePayload = {
        data: "x".repeat(100000), // 100KB string
      };

      notificationHub.emit("session-1", "large-event", largePayload);

      expect(mockClients[0].write).toHaveBeenCalled();
    });

    it("should handle rapid successive events", () => {
      notificationHub.addClient("session-1", mockClients[0]);

      for (let i = 0; i < 100; i++) {
        notificationHub.emit("session-1", "rapid-event", { number: i });
      }

      expect(mockClients[0].write).toHaveBeenCalledTimes(100);
    });

    it("should handle client added/removed during emit", () => {
      const client1 = { id: "client-1", write: jest.fn() };
      const client2 = { id: "client-2", write: jest.fn() };

      notificationHub.addClient("session-1", client1);
      notificationHub.addClient("session-1", client2);

      notificationHub.removeClient("session-1", client1);

      notificationHub.emit("session-1", "test-event", { data: "test" });

      expect(client1.write).not.toHaveBeenCalled();
      expect(client2.write).toHaveBeenCalled();
    });
  });
});
