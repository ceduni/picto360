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
  CLOUDFLARE_IMAGES_SIGNING_KEY: requiredEnv("CLOUDFLARE_IMAGES_SIGNING_KEY"),
  R2_ACCESS_KEY_ID: requiredEnv("R2_ACCESS_KEY_ID"),
  R2_SECRET_ACCESS_KEY : requiredEnv("R2_SECRET_ACCESS_KEY"),
  R2_MEDIA_BUCKET_NAME: process.env.R2_BUCKET || "picto360-uploads",
};