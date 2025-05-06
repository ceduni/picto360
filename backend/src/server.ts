import Fastify from "fastify";
import cors from "@fastify/cors";
//import { connectToDatabase } from "./utils/db";
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

const fastify = Fastify({ logger: true });

const setupServer = async () => {
  //await connectToDatabase();

  fastify.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  });

  fastify.register(contentRoutes);
  fastify.register(formContentRoutes);
  fastify.register(linkContentRoutes);
  fastify.register(mediaContentRoutes);
  fastify.register(textContentRoutes);

  fastify.register(annotationRoutes);
  fastify.register(dimensionRoutes);
  fastify.register(imageRoutes);
  fastify.register(projectRoutes);
  fastify.register(sharingLinkRoutes);

  fastify.get("/", async (_request, reply) => {
    reply.send({ message: "Welcome to Picto360 API" });
  });

  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server is running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
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
