import { FastifyInstance } from "fastify";
import { OAuth2Client } from "google-auth-library";
import { authorize, uploadFile } from "../services/googleDrive.service";
import fs from "fs";
import path from "path";

const TOKEN_PATH = path.join(__dirname, "../../tokens.json");


export default async function oauthRoutes(app: FastifyInstance) {
  app.get("/oauth2callback", async (request, reply) => {
    const { code } = request.query as { code: string };

    try {
      const client = await authorize();
      const { tokens } = await client.getToken(code);
      client.setCredentials(tokens);

      // Save tokens
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
      console.log("✅ Token saved to", TOKEN_PATH);

      reply.type("text/html").send(`
        <html>
          <body>
            <script>window.close();</script>
            <p>L'authentification est réussie. Vous pouvez fermer cette page.</p>
          </body>
        </html>
      `);
    } catch (error) {
      console.error("Error during OAuth2 callback:", error);
      reply.status(500).send("Authentication failed.");
    }
  });

  app.post("/export", async (request, reply) => {
    try {
      const authClient = await authorize();
      console.log("Authorization successful");

      const uploadedFile = await uploadFile(
        authClient,
        "image_projet_picto360.png",
        "../picto-app/public/Sommets St-Sauveur (Avila).JPG"
      );

      console.log("File uploaded to Google Drive:", uploadedFile);
      reply.send({ success: true, file: uploadedFile });
    } catch (error) {
      console.error("Error during file upload:", (error as Error).message);
      reply.status(500).send({ success: false, error: (error as Error).message });
    }
  });
}

