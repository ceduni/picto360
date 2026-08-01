import { env } from '@/config/env';
import Cloudflare from 'cloudflare';

const cloudflare = new Cloudflare({
  apiToken: env.CLOUDFLARE_API_TOKEN, // This is the default and can be omitted
});


export async function getDirectUploadUrl () {
    return cloudflare.images.v2.directUploads.create({
        account_id:env.CLOUDFLARE_ACCOUNT_ID,
        requireSignedURLs: true,
    })
}


function getPrivateImageBaseUrl({
  previousUrl,
  imageId,
}: {
  previousUrl?: string;
  imageId?: string;
}) {
  if (previousUrl) {
    const url = new URL(previousUrl);

    // Remove old signature params before re-signing
    url.searchParams.delete("exp");
    url.searchParams.delete("sig");
    url.searchParams.delete("kid");

    return url.toString();
  }

  if (imageId) {
    return `https://imagedelivery.net/${env.CLOUDFLARE_IMAGES_ACCOUNT_HASH}/${imageId}/public`;
  }

  throw new Error("Either previousUrl or imageId is required");
}


/**
 * This helper is used to sign a image url with a tocken 
 * to make the image readable by the front-end
 */
export async function signPrivateImageURL({
    previousUrl,
    imageId,
    expiryMinutes = 30,
}: {
    previousUrl?: string;
    imageId?: string;
    expiryMinutes?: number;
}) {

    const keySecret = env.CLOUDFLARE_IMAGES_SIGNING_KEY

    const baseUrl = getPrivateImageBaseUrl({ previousUrl, imageId });

    // When will this url expire (in sec)
    const expires = Math.floor(Date.now()/1000)+(60*expiryMinutes)

    // The image url that needs to be signed
    const urlToSign = new URL(baseUrl)

    urlToSign.searchParams.set('exp',expires.toString());

    // Sign the path component using HMAC-SHA256
    const encoder = new TextEncoder()
    const secretKeyData = encoder.encode(keySecret)
    const key = await crypto.subtle.importKey(
        "raw", secretKeyData, {name:"HMAC", hash:"SHA-256"}, false, ["sign"]
    );

    const stringToSign = urlToSign.pathname + urlToSign.search;
    const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(stringToSign))

    // Convert the signature to hex
    const signature = Array.from(new Uint8Array(signatureBuffer))
        .map(b=>b.toString(16).padStart(2,'0')).join('');

    urlToSign.searchParams.set('sig', signature);

    return urlToSign.toString();
}


/**
 * This function help upload an Image directly to CloudFlare Images
 * @param image - the image to upload
 * @returns boolean / the upload status.
 */ 
export async function uploadFileToImages (
    filename:string,
    buffer:Buffer,
    mimeType:string
){
    const file = new File([buffer], filename, { type: mimeType });

    const cloud_image = await cloudflare.images.v1.create({
        account_id:env.CLOUDFLARE_ACCOUNT_ID,
        file,
        requireSignedURLs: true, 
    })

    if (!cloud_image.id || !cloud_image.uploaded){
        throw new Error("Cloudflare image upload failed")
    }
    
    return cloud_image   
}

const deleteFileFromImages = (imageId:string)=>{

}

/**
 * This function returns a one time upload url for the front-end
 * to upload directly to R2 whithout using the Backend
 */
const getR2UploadUrl = () =>{

}

/**
 * 
 */
const uploadFileToR2 = ()=>{

}
