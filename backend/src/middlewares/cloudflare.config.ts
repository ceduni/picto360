import Cloudflare from 'cloudflare';
import { env } from 'process';

const cloudflare_client = new Cloudflare({
  apiToken: env.CLOUDFLARE_API_TOKEN, // This is the default and can be omitted
});

export default cloudflare_client