import { uploadFileToImages, signPrivateImageURL, buildImageDeliveryUrl } from "@/middlewares/cloudflare.images";
import { PictoImage, MediaDocument } from "@/models/pictoMedia.model";

class ImageService {

  async uploadRawImage(fileName:string,file:Buffer, mimeType:string){

    const cloudflare_status = await uploadFileToImages(fileName,file,mimeType)

    if (cloudflare_status.uploaded){
        const deliveryUrl = buildImageDeliveryUrl(cloudflare_status.id!); // uploadFileToImages throws when id is missing

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

  async createImage(imageData: MediaDocument) {
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

  async updateImage(id: string, update: Partial<MediaDocument>) {
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
}

export default new ImageService();
