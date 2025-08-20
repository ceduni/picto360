import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import { getGoogleDriveService } from "@/services/googleDrive.service";
import { randomUUID } from "crypto";

const TOKEN_PATH = path.join(__dirname, "../../tokens.json");

interface AuthTokenRequest {
  code: string;
}

// Helpers
const b64u = (s: string) => Buffer.from(s, "utf8").toString("base64url");
const isSafeReturnTo = (p: unknown): p is string => typeof p === "string" && p.startsWith("/");

export default async function oauthRoutes(app: FastifyInstance) {
  app.post('/api/drive/auth-url', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const driveService = getGoogleDriveService();

      const { returnTo, viewerId } = request.body as { returnTo: string; viewerId?: string };

      const nonce = randomUUID();
      request.session.oauth = { nonce ,createdAt:Date.now() };
      request.session.save();

      const safeReturnTo = isSafeReturnTo(returnTo) ? returnTo : "/";

      const state = b64u(JSON.stringify({n:nonce, r: safeReturnTo, v: viewerId }));

      const authUrl = driveService.generateAuthUrl(state);
      return reply.status(200).send({ authUrl });
    } catch (error) {
      reply.status(500).send({ error: 'Failed to generate auth URL' });
    }
  });

  // Handle OAuth callback
  app.get('/api/drive/auth/callback', async (
    request: FastifyRequest<{ Body: AuthTokenRequest }>,
    reply: FastifyReply
  ) => {
    try {
      const driveService = getGoogleDriveService();

      const {  state, code, error } = request.query as { state?: string; code?: string; error?: string };
      if (error) return reply.code(400).send({ error });
      if (!code) return reply.code(400).send({ error: "missing_code" });   
      console.log("Query valid");

      let payload: { n:string; r: string; v?: string };
      payload = JSON.parse(Buffer.from(String(state), "base64url").toString("utf8")); // validate state
      console.log("Payload passed");

      const sess = request.session.oauth;
      if (!sess?.nonce || payload.n !== sess.nonce) {
        return reply.code(400).send({ error: "state_mismatch" });
      }
      if (Date.now() - (sess.createdAt ?? 0) > 5 * 60_000) {
        return reply.code(400).send({ error: "state_expired" });
      }

      // one-time use
      delete request.session.oauth;

      console.log("Drive service:", driveService)

      const tokens = await driveService.getTokensFromCode(code);
      console.log("Token got");
      
      const returnTo = isSafeReturnTo(payload.r) ? payload.r : "/";

      // save tokens in session
      request.session.google = {
        access_token: tokens.access_token!,
        refresh_token: tokens.refresh_token || undefined,
        expiry: Date.now() + (tokens.expiry_date ?? 0) * 1000,
      };
      await request.session.save();

      return reply.redirect(`http://localhost:3000${returnTo}?auth=success`).code(200);

    } catch (error) {
      reply.status(400).send({ error: `Error during callback : ${error}` });
      reply.redirect(`http://localhost:3000/?auth=error&message=oauth_failed`)
    }
  });
}

