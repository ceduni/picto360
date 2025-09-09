// types/fastify-session.d.ts
import "@fastify/session";

// Augment the data stored on req.session for @fastify/session
declare module "@fastify/session" {
  interface FastifySessionObject {
    oauth?: { nonce: string; createdAt: number };
    google?: {
      uid?:string;
      access_token: string;
      refresh_token?: string;
      expiry: number; // epoch ms
    };
  }
}
