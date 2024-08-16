import Image, { ImageDocument } from "@/models/image.model";

class ImageService {
  async createImage(imageData: ImageDocument) {
    const newImage = new Image(imageData);
    await newImage.save();
    return newImage;
  }

  async getImage(id: string) {
    return Image.findById(id);
  }

  async updateImage(id: string, update: Partial<ImageDocument>) {
    const updatedImage = await Image.findByIdAndUpdate(id, update, {
      new: true,
    });
    return updatedImage;
  }

  async deleteImage(id: string) {
    await Image.findByIdAndDelete(id);
  }

  async getAllImages() {
    return Image.find();
  }
}

export default new ImageService();
