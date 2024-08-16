import Fastify from "fastify";
/*import { connectToDatabase } from "./utils/db";
import { AnnotationRoutes } from "./routes/annotation.route";
import { ImageRoutes } from "./routes/ImageRoutes";
import { ProjectRoutes } from "./routes/ProjectRoutes";*/
import {
  authorize,
  listFiles,
  uploadFile,
} from "./services/googleDrive.service";

const server = Fastify();
const ENABLE_GOOGLE_DRIVE = true;

//server.register(AnnotationRoutes);
//server.register(ImageRoutes);
//server.register(ProjectRoutes);

const start = async () => {
  try {
    //await connectToDatabase();
    await server.listen({ port: 3000 });
    console.log("Server is running on http://localhost:3000");

    //Call Google Drive API as a test
    if (ENABLE_GOOGLE_DRIVE === true) {
      const authClient = await authorize();
      await listFiles(authClient);

      const fileName = "logo_picto360.png";
      const filePath = "../docs/images/logo_picto360.png";
      await uploadFile(authClient, fileName, filePath);
    }
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }

  const shutdown = () => {
    console.log("Shutting down server...");
    server
      .close()
      .then(() => process.exit(0))
      .catch((err) => {
        console.error("Error during shutdown:", err);
        process.exit(1);
      });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

start();
