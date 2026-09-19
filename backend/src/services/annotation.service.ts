import Annotation, { AnnotationDocument } from '../models/annotation.model';

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

  /**
   * Participant-safe read path: returns only annotations marked `visible: true`
   * for a given project. Intended for treasure-hunt style activities where
   * hidden annotations (visible: false) must never be exposed to
   * participant-facing clients (leaking them via the network response would
   * defeat the "find it" mechanic).
   *
   * Do NOT use this for creator/editor views — those need the full set
   * (including hidden annotations) to place/edit them. Use
   * getAnnotationsForProject for that.
   */
  async getVisibleAnnotationsForProject(projectId: string) {
    return Annotation.find({ project: projectId, visible: true });
  }

  /**
   * Creator/editor read path: returns every annotation (including hidden
   * ones) for a project, with `content` populated so callers don't need a
   * separate round-trip per annotation to resolve its Content document.
   */
  async getAnnotationsForProject(projectId: string) {
    return Annotation.find({ project: projectId }).populate("content");
  }
}

export default new AnnotationService();
