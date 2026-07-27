import type { ActivityFull } from "@/utils/Types";

export interface UploadedImage {
  _id: string;
  cloudflareImageId: string;
  url: string;
  name?: string;
}

/**
 * Uploads a raw file to the backend, which proxies it to Cloudflare Images
 * and persists a PictoImage record. Panorama files can be large, so this
 * goes through the backend's multipart endpoint rather than a JSON body.
 */
export async function uploadImageFile(file: File, token: string): Promise<UploadedImage> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/images`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload image");
  }
  return res.json() as Promise<UploadedImage>;
}

/**
 * Attaches an already-uploaded image to an activity's playground scene
 * (creating the playground PictoProject on first use). Returns the updated
 * activity, with `playground` populated.
 */
export async function attachPlaygroundImage(
  activityId: string,
  imageId: string,
  token: string
): Promise<ActivityFull> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/activities/${activityId}/playground/image`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ imageId }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to attach image to activity");
  }
  return res.json() as Promise<ActivityFull>;
}
