import { S3Client } from '@aws-sdk/client-s3';
import Cloudflare from 'cloudflare';
import { env } from 'process';

const cloudflare_client = new Cloudflare({
  apiToken: env.CLOUDFLARE_API_TOKEN, // This is the default and can be omitted
});


const S3 = new S3Client({
	region: "auto",
	endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: `${env.CLOUDFLARE_ACCESS_KEY_ID}`,
		secretAccessKey: `${env.CLOUDFLARE_SECRET_ACCESS_KEY}`,
	},
});

export { cloudflare_client, S3 };