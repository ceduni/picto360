import Cloudflare from "cloudflare";
import { env } from "../src/config/env";

const DEFAULT_MEDIA_BUCKET_NAME = "picto-media";

const accountId = env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = env.CLOUDFLARE_API_TOKEN;

const buckets = [
  env.R2_MEDIA_BUCKET_NAME ||
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

async function setVariantsPrivate(variantName:string){
  try{
    await cloudflare.images.v1.variants.edit(variantName, {
      account_id: accountId!,
      options: {
        fit: "scale-down",
        width: 200,
        height: 200,
        metadata: "none",
      },
      neverRequireSignedURLs: false,
    });    
    console.log(`${variantName} access set to private: success`);
  }catch(error:any){
    console.log(`Failed to set ${variantName} access to private`);
    throw error;
  }
}

async function setupCloudflare() {
  await setVariantsPrivate("variant200")
  for (const bucketName of buckets) {
    await createBucket(bucketName);
  }
}

setupCloudflare().catch((error) => {
  console.error("Cloudflare setup failed");
  console.error(error);
  process.exit(1);
});
