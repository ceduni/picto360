// types/fastify-session.d.ts
import "@fastify/session";
import type { OAuthConnection, OAuthPendingState } from "./oauth.types";
import type { SessionConnection } from "./auth.types";

// Augment the data stored on req.session for @fastify/session
declare module "@fastify/session" {
  interface FastifySessionObject {
    oauth?: OAuthPendingState;
    oauthConnections?: Partial<Record<"google-drive", OAuthConnection>>;
    notificationScope?: string;
    auth_google?: SessionConnection;
    auth_jwt?: SessionConnection;
    auth_onedrive?: SessionConnection;
  }
}
