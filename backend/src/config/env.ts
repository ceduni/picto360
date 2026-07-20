import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }

  return value;
}

export const env = {
  FRONTEND_SERVER: requiredEnv("FRONTEND_SERVER"),
  CLOUDFLARE_ACCOUNT_ID: requiredEnv("CLOUDFLARE_ACCOUNT_ID"),
  CLOUDFLARE_API_TOKEN: requiredEnv("CLOUDFLARE_API_TOKEN"),
  CLOUDFLARE_IMAGES_ACCOUNT_HASH: requiredEnv("CLOUDFLARE_IMAGES_ACCOUNT_HASH"),
  R2_MEDIA_BUCKET_NAME: process.env.R2_MEDIA_BUCKET_NAME || "picto-media",
};