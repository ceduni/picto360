import Dimension, { DimensionDocument } from '../models/dimension.model';

class DimensionService {
  async createDimension(dimension: DimensionDocument) {
    const newDimension = new Dimension(dimension);
    await newDimension.save();
    return newDimension;
  }

  async getDimension(id: string) {
    return Dimension.findById(id);
  }

  async updateDimension(id: string, update: Partial<DimensionDocument>) {
    const updatedDimension = await Dimension.findByIdAndUpdate(id, update, { new: true });
    return updatedDimension;
  }

  async deleteDimension(id: string) {
    await Dimension.findByIdAndDelete(id);
  }

  async getAllDimensions() {
    return Dimension.find();
  }
}

export default new DimensionService();
