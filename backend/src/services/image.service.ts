import { uploadFileToImages, signPrivateImageURL } from "@/middlewares/cloudflare";
import PictoImage from "@/models/image.model";
import { ImageDocument } from "@/models/image.model";
import { ProjectDocument } from "@/models/project.model";
import {UserDocument} from "@models/user.model"
import permisionService from "./permission.service";
import { PermissionAction } from "@/models/user_perm.model";
import { env } from "@/config/env";

class ImageService {

  async uploadRawImage(fileName:string,file:Buffer, mimeType:string){

    const cloudflare_status = await uploadFileToImages(fileName,file,mimeType)

    if (cloudflare_status.uploaded){
        // Cloudflare's SDK response may already include a delivery URL for the
        // "private" variant in `variants`. If the account doesn't return one
        // (e.g. variants weren't populated on the response), fall back to
        // building the delivery URL ourselves — same shape used for signing
        // in signPrivateImageURL: https://imagedelivery.net/<account_id>/<imageId>/public
        const deliveryUrl =
          cloudflare_status.variants?.find((e) => e.endsWith("public")) ??
          `https://imagedelivery.net/${env.CLOUDFLARE_IMAGES_ACCOUNT_HASH}/${cloudflare_status.id}/public`;

        // store into db
        const store_image = new PictoImage({
          cloudflareImageId:cloudflare_status.id,
          name:cloudflare_status.filename,
          url: deliveryUrl,
        })
        await store_image.save()
        return store_image            
    }         
  }

  async createImage(imageData: ImageDocument) {
    const newImage = new PictoImage(imageData);
    await newImage.save();
    return newImage;
  }

  async signPrivateImage(imageId:string){
    return signPrivateImageURL({imageId:imageId})
  }

  async refreshImageUrlAccess(prevUrl:string){
    return signPrivateImageURL({previousUrl:prevUrl})
  }

  async getImage(id: string) {
    return PictoImage.findById(id);
  }

  async updateImage(id: string, update: Partial<ImageDocument>) {
    const updatedImage = await PictoImage.findByIdAndUpdate(id, update, {
      new: true,
    });
    return updatedImage;
  }

  async deleteImage(id: string) {
    await PictoImage.findByIdAndDelete(id);
  }

  async getAllImages() {
    return PictoImage.find();
  }

  async linkImageToProject (image: ImageDocument, project: ProjectDocument, user: UserDocument) {
    const required_perm: PermissionAction[] = ["UPLOAD"]
    const hasPermission = await permisionService.verifyUserPermForProject(user, project, required_perm);

    if (!hasPermission) {
      throw new Error("User does not have permission to upload images to this project");
    }

    project.images.push(image);
    await project.save();
    return project;
  }
}

export default new ImageService();
