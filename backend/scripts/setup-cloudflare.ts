import Cloudflare from "cloudflare";
import "../src/config/env";

const DEFAULT_MEDIA_BUCKET_NAME = "picto-media";

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;

const buckets = [
  process.env.R2_MEDIA_BUCKET_NAME ||
    process.env.R2_CONTENT_BUCKET_NAME ||
    DEFAULT_MEDIA_BUCKET_NAME,
];

if (!accountId) {
  throw new Error("Missing CLOUDFLARE_ACCOUNT_ID");
}

if (!apiToken) {
  throw new Error("Missing CLOUDFLARE_API_TOKEN");
}

const cloudflare = new Cloudflare({
  apiToken,
});

async function createBucket(bucketName: string) {
  try {
    await cloudflare.r2.buckets.create({
      account_id: accountId!,
      name: bucketName,
    });

    console.log(`Created R2 bucket: ${bucketName}`);
  } catch (error: any) {
    if (error.status === 409 || error.code === 10073) {
      console.log(`R2 bucket already exists: ${bucketName}`);
      return;
    }

    throw error;
  }
}

async function setupCloudflare() {
  for (const bucketName of buckets) {
    await createBucket(bucketName);
  }
}

setupCloudflare().catch((error) => {
  console.error("Cloudflare setup failed");
  console.error(error);
  process.exit(1);
});
