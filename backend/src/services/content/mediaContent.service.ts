import MediaContent, {
  MediaContentDocument,
} from "@/models/content/mediaContent.model";

class MediaContentService {
  async createMediaContent(mediaContent: MediaContentDocument) {
    const newMediaContent = new MediaContent(mediaContent);
    await newMediaContent.save();
    return newMediaContent;
  }

  async getMediaContent(id: string) {
    return MediaContent.findById(id);
  }

  async updateMediaContent(id: string, update: Partial<MediaContentDocument>) {
    const updatedMediaContent = await MediaContent.findByIdAndUpdate(
      id,
      update,
      { new: true }
    );
    return updatedMediaContent;
  }

  async deleteMediaContent(id: string) {
    await MediaContent.findByIdAndDelete(id);
  }

  async getAllMediaContents() {
    return MediaContent.find();
  }
}

export default new MediaContentService();
