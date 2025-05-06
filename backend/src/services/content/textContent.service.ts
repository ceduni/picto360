import TextContent, {
  TextContentDocument,
} from "@/models/content/textContent.model";

class TextContentService {
  async createTextContent(textContent: TextContentDocument) {
    const newTextContent = new TextContent(textContent);
    await newTextContent.save();
    return newTextContent;
  }

  async getTextContent(id: string) {
    return TextContent.findById(id);
  }

  async updateTextContent(id: string, update: Partial<TextContentDocument>) {
    const updatedTextContent = await TextContent.findByIdAndUpdate(id, update, {
      new: true,
    });
    return updatedTextContent;
  }

  async deleteTextContent(id: string) {
    await TextContent.findByIdAndDelete(id);
  }

  async getAllTextContents() {
    return TextContent.find();
  }
}

export default new TextContentService();
