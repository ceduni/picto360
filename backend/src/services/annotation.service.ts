import Annotation, { AnnotationDocument } from '@/models/annotation.model';

class AnnotationService {
  async createAnnotation(annotation: AnnotationDocument) {
    const newAnnotation = new Annotation(annotation);
    await newAnnotation.save();
    return newAnnotation;
  }

  async getAnnotation(id: string) {
    return Annotation.findById(id);
  }

  async updateAnnotation(id: string, update: Partial<AnnotationDocument>) {
    const updatedAnnotation = await Annotation.findByIdAndUpdate(id, update, { new: true });
    return updatedAnnotation;
  }

  async deleteAnnotation(id: string) {
    await Annotation.findByIdAndDelete(id);
  }

  async getAllAnnotations() {
    return Annotation.find();
  }
}

export default new AnnotationService();
