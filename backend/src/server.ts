import Fastify from "fastify";
import  { fastifyCors } from "@fastify/cors";
import annotationRoutes from "./routes/annotation.routes";
import contentRoutes from "./routes/content/content.routes";
import imageCompressionRoutes from "./routes/imageCompression.routes";
import imageRoutes from "./routes/image.routes";
import projectRoutes from "./routes/project.routes";
import connectToDatabase  from "./utils/db";
import fastifyMultipart from "@fastify/multipart";
import oauthRoutes from "./routes/oauth.routes";
import activityRoutes from "./routes/activity.routes";
import userRoutes from "./routes/user.route";
import exportRoutes from "./routes/export.routes";
import fastifyCookie  from "@fastify/cookie";
import fastifySession from "@fastify/session";

import 'dotenv/config'; // Load environment variables from .env file

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: { colorize: true, translateTime: "SYS:HH:MM:ss" },
    },
  },
});

const setupServer = async () => {
  try {
    await connectToDatabase();

    await fastify.register(fastifyCors, {
      origin: (origin, cb) => {
        const allowed = [process.env.FRONTEND_SERVER || "http://localhost:3000"];
        if (!origin) {
          // Allow requests without an Origin header (e.g., same-site or redirect flows)
          cb(null, true);
          return;
        }
        if (allowed.includes(origin)) cb(null, true);
        else cb(new Error("Not allowed by CORS"), false);
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"],
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

    // Register the OAuth + export routes (require Google credentials)
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
      fastify.register(oauthRoutes);
      fastify.register(exportRoutes);
    } else {
      fastify.log.warn("GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET not set — Drive/export routes disabled");
    }

    fastify.register(imageCompressionRoutes);
    fastify.register(contentRoutes);

    fastify.register(activityRoutes);
    fastify.register(userRoutes);

    fastify.register(annotationRoutes);
    fastify.register(imageRoutes);
    fastify.register(projectRoutes);

    fastify.get("/", async (_request, reply) => {
      reply.send({ message: "Welcome to Picto360 API" });
    });

    await fastify.listen({ port: Number(process.env.PORT) || 5001 });

    fastify.log.info(`Server is running on port ${process.env.FRONTEND_SERVER}`);
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
