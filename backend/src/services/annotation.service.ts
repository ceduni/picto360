import Annotation, { AnnotationDocument } from '../models/annotation.model';
import { MediaContentDocument } from '../models/content/mediaContent.model';
import { UserDocument } from '../models/user.model';
import MediaService from './media.service';

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

  /**
   * Same as getAnnotationsForProject, plus a short lived signed URL
   * (`content.access`) for every uploaded media, signed in one batch so the
   * client doesn't need a round-trip per media hotspot.
   */
  async getAnnotationsWithMediaAccess(user: UserDocument, projectId: string) {
    const annotations = (await this.getAnnotationsForProject(projectId)).map((annotation) => annotation.toObject());

    const mediaIdOf = (annotation: (typeof annotations)[number]) => {
      const content = annotation.content as unknown as MediaContentDocument | undefined;
      return content?.contentType === "MediaContent" && content.media ? String(content.media) : null;
    };

    const mediaIds = annotations.map(mediaIdOf).filter((id): id is string => id !== null);
    if (mediaIds.length === 0) return annotations;

    const access = await MediaService.getAccessUrlsForPlayground(user, projectId, mediaIds);

    return annotations.map((annotation) => {
      const mediaId = mediaIdOf(annotation);
      if (!mediaId) return annotation;
      return { ...annotation, content: { ...(annotation.content as object), access: access.get(mediaId) ?? null } };
    });
  }
}

export default new AnnotationService();
