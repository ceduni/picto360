/**
 * Jest Setup File
 * Global test configuration and setup for all tests
 */

// Set test environment variables
process.env.NODE_ENV = "test";
process.env.LOG_LEVEL = "error"; // Suppress logs during tests

// Mock timers (optional, for tests that need it)
// jest.useFakeTimers();

// Global test utilities
global.testUtils = {
  /**
   * Create a mock FastifyRequest
   */
  createMockRequest: (overrides = {}) => ({
    session: {},
    sessionId: "test-session-123",
    query: {},
    body: {},
    params: {},
    ...overrides,
  }),

  /**
   * Create a mock FastifyReply
   */
  createMockReply: (overrides = {}) => ({
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    code: jest.fn().mockReturnThis(),
    redirect: jest.fn().mockReturnThis(),
    ...overrides,
  }),

  /**
   * Create mock auth tokens
   */
  createMockTokens: (overrides = {}) => ({
    access_token: "mock-access-token",
    refresh_token: "mock-refresh-token",
    expiry_date: Date.now() + 3600000,
    token_type: "Bearer",
    ...overrides,
  }),

  /**
   * Create mock hotspot data
   */
  createMockHotspot: (overrides = {}) => ({
    id: "hotspot-1",
    pitch: 45,
    yaw: 90,
    type: "link",
    content: "Test hotspot",
    ...overrides,
  }),

  /**
   * Create test file buffer
   */
  createTestFileBuffer: (size = 1024) => Buffer.alloc(size, "test"),

  /**
   * Create mock notification client
   */
  createMockNotificationClient: () => ({
    write: jest.fn(),
  }),
};

// Suppress console output during tests (optional)
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
