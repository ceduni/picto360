import ShapeContent, {
  ShapeContentDocument,
} from "@/models/content/shapeContent.model";

class ShapeContentService {
  async createShapeContent(shapeContent: ShapeContentDocument) {
    const newShapeContent = new ShapeContent(shapeContent);
    await newShapeContent.save();
    return newShapeContent;
  }

  async getShapeContent(id: string) {
    return ShapeContent.findById(id);
  }

  async updateShapeContent(id: string, update: Partial<ShapeContentDocument>) {
    const updatedShapeContent = await ShapeContent.findByIdAndUpdate(id, update, {
      new: true,
    });
    return updatedShapeContent;
  }

  async deleteShapeContent(id: string) {
    await ShapeContent.findByIdAndDelete(id);
  }

  async getAllShapeContent() {
    return ShapeContent.find();
  }
}

export default new ShapeContentService();
