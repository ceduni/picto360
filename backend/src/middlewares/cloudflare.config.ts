import { S3Client } from '@aws-sdk/client-s3';
import Cloudflare from 'cloudflare';
import { env } from '@/config/env';

const cloudflare_client = new Cloudflare({
  apiToken: env.CLOUDFLARE_API_TOKEN,
});

// R2 exposes an S3-compatible API, authenticated with R2-specific access keys
// (not the Cloudflare API token above).
const S3 = new S3Client({
	region: "auto",
	endpoint: env.R2_ENDPOINT,
	credentials: {
		accessKeyId: env.R2_ACCESS_KEY_ID,
		secretAccessKey: env.R2_SECRET_ACCESS_KEY,
	},
	// Since 3.729 the SDK adds checksums by default, which R2 doesn't fully
	// support. For presigned PUTs it would also bake the CRC32 of an empty body
	// into the URL, which can't match the file the browser sends.
	requestChecksumCalculation: "WHEN_REQUIRED",
	responseChecksumValidation: "WHEN_REQUIRED",
});

export { cloudflare_client, S3 };
