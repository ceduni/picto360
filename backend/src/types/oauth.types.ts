export type OAuthProviderId = "google-drive";

export type OAuthProviderName = "google";

export type OAuthStatusReason =
  | "revoked"
  | "expired"
  | "manual_disconnect"
  | "login"
  | "refresh";

export interface OAuthStatus {
  isAuthenticated: boolean;
  provider: OAuthProviderName | null;
  scopes?: string[];
  connectedAt?: string;
  reason?: OAuthStatusReason;
}

export interface OAuthPendingState {
  nonce: string;
  createdAt: number;
  providerId: OAuthProviderId;
}

export interface OAuthStatePayload {
  n: string;
  r: string;
  v?: string;
  p: OAuthProviderId;
}

export interface OAuthConnection {
  providerId: OAuthProviderId;
  provider: OAuthProviderName;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  scopes: string[];
  connectedAt: string;
}

export interface OAuthCallbackResult {
  redirectTo: string;
  status: OAuthStatus;
}
