import Content, { ContentDocument } from "@/models/content/content.model";

class ContentService {
  async createContent(content: ContentDocument) {
    const newContent = new Content(content);
    await newContent.save();
    return newContent;
  }

  async getContent(id: string) {
    return Content.findById(id);
  }

  async updateContent(id: string, update: Partial<ContentDocument>) {
    const updatedContent = await Content.findByIdAndUpdate(id, update, {
      new: true,
    });
    return updatedContent;
  }

  async deleteContent(id: string) {
    await Content.findByIdAndDelete(id);
  }

  async getAllContents() {
    return Content.find();
  }
}

export default new ContentService();
