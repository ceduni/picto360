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

      let payload: { n:string; r: string; v?: string };
      payload = JSON.parse(Buffer.from(String(state), "base64url").toString("utf8")); // validate state

      const sess = request.session.oauth;
      if (!sess?.nonce || payload.n !== sess.nonce) {
        return reply.code(400).send({ error: "state_mismatch" });
      }
      if (Date.now() - (sess.createdAt ?? 0) > 5 * 60_000) {
        return reply.code(400).send({ error: "state_expired" });
      }

      // one-time use
      delete request.session.oauth;

      const tokens = await driveService.getTokensFromCode(code);
      
      const returnTo = isSafeReturnTo(payload.r) ? payload.r : "/";

      // save tokens in session
      request.session.google = {
        access_token: tokens.access_token!,
        refresh_token: tokens.refresh_token || undefined,
        expiry: Date.now() + (tokens.expiry_date ?? 0) * 1000,
      };
      await request.session.save();

      driveService.broadcast('auth-status',{connected: true, expiresAt: request.session.google.expiry});

      return reply.redirect(`http://localhost:3000${returnTo}`).code(200);

    } catch (error) {
      reply.status(400).send({ error: `Error during callback : ${error}` });
      reply.redirect(`http://localhost:3000/?auth=error&message=oauth_failed`)
    }
  });

  app.get("/api/auth/status",async(request:FastifyRequest,reply:FastifyReply)=>{
    try{
      const driveService = getGoogleDriveService();
      const authStatus = await driveService.getAuthStatus(request);
      return  authStatus ;
    }catch(error){
      reply.code(500).send(`Error on auth status load ${error}`)
    }
  });
  

  app.get("/api/auth/stream",async(request:FastifyRequest,reply:FastifyReply)=>{

    const driveService = getGoogleDriveService();

    const origin = request.headers.origin;
    const allowed = ["http://localhost:3000"];

    if (origin && allowed.includes(origin)) {
      reply.raw.setHeader("Access-Control-Allow-Origin", origin);
      reply.raw.setHeader("Access-Control-Allow-Credentials", "true");
    }
    reply.raw.setHeader('Content-Type','text/event-stream');
    reply.raw.setHeader('Cache-Control','no-cache');
    reply.raw.setHeader('Connection','keep-alive');

    // reply.raw.write(`event: auth-status\ndata: {"isAuthenticated":false}\n\n`);

    const id = Date.now().toString();
    const client = {id,write: (chunk:string) => reply.raw.write(chunk)};
    driveService.clients.add(client);

    const status = await driveService.getAuthStatus(request);
    status && client.write(`event: auth-status\ndata: ${JSON.stringify(status)}\n\n`);

    // 👇 keep-alive pings
    const interval = setInterval(() => {
      reply.raw.write(`event: ping\ndata: ${Date.now()}\n\n`);
    }, 25000);

    request.raw.on('close',()=>{
      driveService.clients.delete(client);
      clearInterval(interval);
    });
  });

  app.post("/api/auth/logout", async (req, reply) => {
      const driveService = getGoogleDriveService();

    if (!req.session.google?.access_token && !req.session.google?.refresh_token) {
      driveService.broadcast('auth-status',{connected: false, reason:'manual-logout'})
      return reply.code(401).send("Not authenticated with Google");
    }
    
    try{    
      // To revoke Google's token first
      const g = req.session.google;

      if (g?.refresh_token) {
        await driveService.revokeGoogleToken(g.refresh_token);
      } else if (g?.access_token) {
        await driveService.revokeGoogleToken(g.access_token);
      }

      delete req.session.google;
      delete req.session.oauth; // if you stored a nonce
      await req.session.save?.();  // optional

      // destroy the whole session (cookie invalidation)
      req.session.destroy()

      driveService.broadcast('auth-status',{connected: false, reason:'manual-logout'})

      return reply.send({ ok: true });
    }catch(error){
      return reply.code(500).send(`Error on Drive logout ${error}`);
    }
  });

}

