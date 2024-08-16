import SharingLink, { SharingLinkDocument } from '@/models/sharingLink.model';

class SharingLinkService {
  async createSharingLink(sharingLink: SharingLinkDocument) {
    const newSharingLink = new SharingLink(sharingLink);
    await newSharingLink.save();
    return newSharingLink;
  }

  async getSharingLink(id: string) {
    return SharingLink.findById(id);
  }

  async updateSharingLink(id: string, update: Partial<SharingLinkDocument>) {
    const updatedSharingLink = await SharingLink.findByIdAndUpdate(id, update, { new: true });
    return updatedSharingLink;
  }

  async deleteSharingLink(id: string) {
    await SharingLink.findByIdAndDelete(id);
  }

  async getAllSharingLinks() {
    return SharingLink.find();
  }
}

export default new SharingLinkService();
