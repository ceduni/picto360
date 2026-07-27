import Content, { ContentDocument } from "@/models/content/baseContent.model";
// Imported for their registration side effect only: these files call
// Content.discriminator(...) at module load, which is what populates
// Content.discriminators below. Nothing else in the codebase imports them,
// so without this the discriminator map is empty and createContent/
// updateContent silently fall back to the base Content schema, dropping
// type-specific fields like `body`/`url`/`r2Key`.
import "@/models/content/textContent.model";
import "@/models/content/linkContent.model";
import "@/models/content/mediaContent.model";

class ContentService {
  async createContent(content: ContentDocument) {
    const Model = content.contentType ? Content.discriminators?.[content.contentType] : undefined;
    const newContent = new (Model ?? Content)(content);
    await newContent.save();
    return newContent;
  }

  async getContent(id: string) {
    return Content.findById(id);
  }

  async updateContent(id: string, update: Partial<ContentDocument>) {
    const existing = await Content.findById(id);
    if (!existing) return null;
    const Model = existing.contentType ? Content.discriminators?.[existing.contentType] : undefined;
    const updatedContent = Model
      ? await Model.findByIdAndUpdate(id, update, { new: true })
      : await Content.findByIdAndUpdate(id, update, { new: true });
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
