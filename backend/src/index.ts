import fastifyMultipart from "@fastify/multipart";
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { promises as fsPromises } from "fs";
import * as fs from "fs";
import path from "path";
import process from "process";
import { google, drive_v3 } from "googleapis";
import { authenticate } from "@google-cloud/local-auth";
import { OAuth2Client } from "google-auth-library";

const app = fastify({
  logger: true,
  bodyLimit: 104857600, // 100 MB
});

app.register(fastifyCors, {
  origin: "http://localhost:5173", // Autoriser votre frontend
  methods: ["GET", "POST"], // Autoriser les méthodes GET et POST
});

app.register(fastifyMultipart, {
  attachFieldsToBody: true,
  limits: {
    fileSize: 50 * 1024 * 1024, // Limite de 50 MB
  },
});

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
  try {
    const content = await fsPromises.readFile(TOKEN_PATH, "utf8");
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials) as OAuth2Client;
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client: OAuth2Client): Promise<void> {
  const content = await fsPromises.readFile(CREDENTIALS_PATH, "utf8");
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fsPromises.writeFile(TOKEN_PATH, payload, "utf8");
}

async function authorize(): Promise<OAuth2Client> {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = (await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })) as OAuth2Client;
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function uploadFile(
  authClient: OAuth2Client,
  fileName: string,
  filePath: string
): Promise<drive_v3.Schema$File> {
  const drive = google.drive({ version: "v3", auth: authClient });
  const fileMetadata = {
    name: fileName,
  };
  const media = {
    mimeType: "application/octet-stream",
    body: fs.createReadStream(filePath),
  };

  const file = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id, name",
  });

  console.log(`File uploaded: ${file.data.name} (${file.data.id})`);
  return file.data;
}

// Définir un type pour les paramètres de requête
interface OAuth2CallbackQuery {
  code: string;
}

// Route pour gérer la redirection OAuth2
app.get<{ Querystring: OAuth2CallbackQuery }>("/", async (request, reply) => {
  const { code } = request.query;

  try {
    const client = await authorize();
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    await saveCredentials(client);

    reply.type("text/html").send(`
      <html>
        <body>
          <script>
            window.close();
          </script>
          <p>L'authentification est réussie. Vous pouvez fermer cette page.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error during OAuth2 callback:", error);
    reply.status(500).send("Authentication failed.");
  }
});

// API d'exportation
app.post("/export", async (request, reply) => {
  try {
    // Autorisation Google Drive
    const authClient = await authorize();
    console.log("Authorization successful");

    // Téléverser le fichier sur Google Drive
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

const start = async () => {
  try {
    await app.listen({ port: 3001 });
    app.log.info(`Server listening on http://localhost:3001`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
