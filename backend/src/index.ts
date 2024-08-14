// picto360-backend/index.js
/*
import fastify from 'fastify';

const fastify = require('fastify')({ logger: true });
const { MongoClient } = require('mongodb');

// Connexion à MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'picto360';

const client = new MongoClient(url);

const start = async () => {
  try {
    await client.connect();
    fastify.mongo = client.db(dbName);

    fastify.get('/', async (request, reply) => {
      const collection = fastify.mongo.collection('images');
      const result = await collection.find().toArray();
      return result;
    });

    await fastify.listen(3000);
    fastify.log.info(`Server listening on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
*/

import { promises as fsPromises } from 'fs';
import * as fs from 'fs';
import path from 'path';
import process from 'process';
import { google, drive_v3 } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import { OAuth2Client } from 'google-auth-library';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client | null>}
 */
async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
  try {
    const content = await fsPromises.readFile(TOKEN_PATH, 'utf8');
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials) as OAuth2Client;
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: OAuth2Client): Promise<void> {
  const content = await fsPromises.readFile(CREDENTIALS_PATH, 'utf8');
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fsPromises.writeFile(TOKEN_PATH, payload, 'utf8');
}

/**
 * Load or request or authorization to call APIs.
 *
 * @return {Promise<OAuth2Client>}
 */
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

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 * @return {Promise<void>}
 */
async function listFiles(authClient: OAuth2Client): Promise<void> {
  const drive = google.drive({ version: 'v3', auth: authClient });
  const res = await drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  });
  const files = res.data.files;
  if (!files || files.length === 0) {
    console.log('No files found.');
    return;
  }

  console.log('Files:');
  files.map((file) => {
    console.log(`${file.name} (${file.id})`);
  });
}

/**
 * Uploads a file to Google Drive.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 * @param {string} fileName The name of the file to be uploaded.
 * @param {string} filePath The path of the file to be uploaded.
 * @return {Promise<drive_v3.Schema$File>}
 */
async function uploadFile(authClient: OAuth2Client, fileName: string, filePath: string): Promise<drive_v3.Schema$File> {
  const drive = google.drive({ version: 'v3', auth: authClient });
  const fileMetadata = {
    name: fileName,
  };
  const media = {
    mimeType: 'application/octet-stream',
    body: fs.createReadStream(filePath),
  };

  const file = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id, name',
  });

  console.log(`File uploaded: ${file.data.name} (${file.data.id})`);
  return file.data;
}

authorize().then(async (authClient) => {
  // List files
  await listFiles(authClient);

  // Upload a file
  const fileName = 'logo_picto360.png'; // Replace with your file name
  const filePath = '../docs/images/logo_picto360.png'; // Replace with your file path

  await uploadFile(authClient, fileName, filePath);
}).catch(console.error);
