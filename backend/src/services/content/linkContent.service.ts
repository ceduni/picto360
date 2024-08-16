import LinkContent, {
  LinkContentDocument,
} from "@/models/content/linkContent.model";

class LinkContentService {
  async createLinkContent(linkContent: LinkContentDocument) {
    const newLinkContent = new LinkContent(linkContent);
    await newLinkContent.save();
    return newLinkContent;
  }

  async getLinkContent(id: string) {
    return LinkContent.findById(id);
  }

  async updateLinkContent(id: string, update: Partial<LinkContentDocument>) {
    const updatedLinkContent = await LinkContent.findByIdAndUpdate(id, update, {
      new: true,
    });
    return updatedLinkContent;
  }

  async deleteLinkContent(id: string) {
    await LinkContent.findByIdAndDelete(id);
  }

  async getAllLinkContent() {
    return LinkContent.find();
  }
}

export default new LinkContentService();
