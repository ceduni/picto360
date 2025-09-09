import Fastify from "fastify";
import  { fastifyCors } from "@fastify/cors";
import annotationRoutes from "./routes/annotation.routes";
import contentRoutes from "./routes/content/content.routes";
import formContentRoutes from "./routes/content/formContent.routes";
import linkContentRoutes from "./routes/content/linkContent.routes";
import mediaContentRoutes from "./routes/content/mediaContent.routes";
import textContentRoutes from "./routes/content/textContent.routes";
import dimensionRoutes from "./routes/dimension.routes";
import imageRoutes from "./routes/image.routes";
import projectRoutes from "./routes/project.routes";
import sharingLinkRoutes from "./routes/sharingLink.routes";
import connectToDatabase  from "./utils/db";
import fastifyMultipart from "@fastify/multipart";
import oauthRoutes from "./routes/oauth.routes";
import activityRoutes from "./routes/activity.routes";
import Team from "./models/team.model";
import userRoutes from "./routes/user.route";
import exportRoutes from "./routes/export.routes";
import fastifyCookie  from "@fastify/cookie";
import fastifySession from "@fastify/session";

import 'dotenv/config';

const fastify = Fastify({ logger: true });

const setupServer = async () => {
  try {
    await connectToDatabase();

    await fastify.register(fastifyCors, {
      origin: (origin, cb) => {
        const allowed = ["http://localhost:3000"];
        if (!origin) {
          // Allow requests without an Origin header (e.g., same-site or redirect flows)
          cb(null, true);
          return;
        }        
        if (allowed.includes(origin)) cb(null, true);
        else cb(new Error("Not allowed by CORS"), false);
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true, // <-- critical when using credentials: 'include'
      maxAge: 86400,
    });

    const SESSION_SECRET = process.env.FASTIFY_SESSION_SECRET;
    if (!SESSION_SECRET || SESSION_SECRET.length<32) {
      throw new Error("FASTIFY_SESSION_SECRET must be defined");
    }

    await fastify.register(fastifyCookie);
    await fastify.register(fastifySession,{
      secret: SESSION_SECRET,               
      cookie: {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: "auto",                     // false on HTTP, true on HTTPS
      },
    });

    await fastify.register(fastifyMultipart, {
      limits: { fileSize: 50 * 1024 * 1024 }
    });

    // Register the OAuth + export routes
    fastify.register(oauthRoutes);
    fastify.register(exportRoutes);

    fastify.register(contentRoutes);
    fastify.register(formContentRoutes);
    fastify.register(linkContentRoutes);
    fastify.register(mediaContentRoutes);
    fastify.register(textContentRoutes);

    fastify.register(activityRoutes);
    fastify.register(userRoutes);
    
    fastify.register(annotationRoutes);
    fastify.register(dimensionRoutes);
    fastify.register(imageRoutes);
    fastify.register(projectRoutes);
    fastify.register(sharingLinkRoutes);

    fastify.get("/", async (_request, reply) => {
      reply.send({ message: "Welcome to Picto360 API" });
    });

    fastify.get("/teams", async (request, reply) => {
    try{
        const teams = await Team.find();
        reply.send(teams);
    }catch (err) {
        console.error("❌ GET /activities error:", err);
        reply.status(500).send({ error: 'Failed to fetch teams', 
                                message: err instanceof Error ? err.message:JSON.stringify(err) });
    }
    });

    await fastify.listen({port:5000});
    fastify.log.info(`Server is running on port http://localhost:5000`);
  } catch (err) {
    fastify.log.error("❌ Server startup failed:", err);
    process.exit(1);
  }

  const shutdown = () => {
    fastify.log.info("Shutting down server...");
    fastify
      .close()
      .then(() => process.exit(0))
      .catch((err) => {
        fastify.log.error("Error during shutdown:", err);
        process.exit(1);
      });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

setupServer();
